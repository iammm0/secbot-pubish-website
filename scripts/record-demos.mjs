/**
 * Record SecBot Web UI demos with Playwright (system Chrome) and export GIF via ffmpeg.
 * Usage: node scripts/record-demos.mjs [--theme light|dark] [--name clip1,clip2]
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "demos");
const RAW_DIR = path.join(ROOT, "tmp", "demo-raw");
// 本机 ffmpeg（homebrew）；旧脚本指向仓库内 tools/ffmpeg/ffmpeg.exe，已失效。
const FFMPEG = process.env.FFMPEG_BIN || "/opt/homebrew/bin/ffmpeg";
const BASE = process.env.SECBOT_DEMO_URL || "http://127.0.0.1:8000";

const themeArg = process.argv.indexOf("--theme");
const THEME = themeArg >= 0 ? process.argv[themeArg + 1] || "dark" : "dark";
const nameArg = process.argv.indexOf("--name");
const CLIP_FILTER = nameArg >= 0 ? new Set((process.argv[nameArg + 1] || "").split(",").filter(Boolean)) : null;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(RAW_DIR, { recursive: true });

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", windowsHide: true });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}`));
    });
  });
}

async function webmToGif(webmPath, gifPath, { fps = 12, width = 960 } = {}) {
  const palette = path.join(RAW_DIR, `${path.basename(gifPath, ".gif")}-palette.png`);
  await run(FFMPEG, [
    "-y",
    "-i",
    webmPath,
    "-vf",
    `fps=${fps},scale=${width}:-1:flags=lanczos,palettegen=stats_mode=diff`,
    palette,
  ]);
  await run(FFMPEG, [
    "-y",
    "-i",
    webmPath,
    "-i",
    palette,
    "-lavfi",
    `fps=${fps},scale=${width}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
    "-loop",
    "0",
    gifPath,
  ]);
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function recordClip(page, context, name, action, opts = {}) {
  if (CLIP_FILTER && !CLIP_FILTER.has(name)) {
    return { name, skipped: true };
  }
  const webmPath = path.join(RAW_DIR, `${name}.webm`);
  const gifPath = path.join(OUT_DIR, `${name}-${THEME}.gif`);
  console.log(`\n[record] ${name} (theme=${THEME})`);

  await context.tracing?.stop?.().catch(() => {});
  const pageVideo = page.video();
  // Playwright records for whole context when recordVideo is set; we use clip via CDP screencast alternative:
  // Instead: take many screenshots during action and stitch — more reliable for short clips.
  const framesDir = path.join(RAW_DIR, name);
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  let frame = 0;
  let capturing = true;
  const captureLoop = (async () => {
    while (capturing) {
      const file = path.join(framesDir, `f${String(frame).padStart(4, "0")}.png`);
      await page.screenshot({ path: file, type: "png" });
      frame += 1;
      await sleep(opts.intervalMs ?? 120);
    }
  })();

  try {
    await action(page);
    await sleep(opts.tailMs ?? 600);
  } finally {
    capturing = false;
    await captureLoop;
  }

  if (frame < 2) {
    throw new Error(`Too few frames for ${name}`);
  }

  await run(FFMPEG, [
    "-y",
    "-framerate",
    String(opts.fps ?? 8),
    "-i",
    path.join(framesDir, "f%04d.png"),
    "-vf",
    `fps=${opts.fps ?? 8},scale=${opts.width ?? 960}:-1:flags=lanczos,palettegen=stats_mode=diff`,
    "-update",
    "1",
    path.join(framesDir, "palette.png"),
  ]);
  await run(FFMPEG, [
    "-y",
    "-framerate",
    String(opts.fps ?? 8),
    "-i",
    path.join(framesDir, "f%04d.png"),
    "-i",
    path.join(framesDir, "palette.png"),
    "-lavfi",
    `fps=${opts.fps ?? 8},scale=${opts.width ?? 960}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
    "-loop",
    "0",
    gifPath,
  ]);

  const size = fs.statSync(gifPath).size;
  console.log(`[ok] ${gifPath} (${Math.round(size / 1024)} KB, ${frame} frames)`);
  return { name, gifPath, frames: frame, size };
}

async function main() {
  if (!fs.existsSync(FFMPEG)) {
    throw new Error(`ffmpeg missing: ${FFMPEG}`);
  }

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    colorScheme: THEME === "light" ? "light" : "dark",
  });
  const page = await context.newPage();
  const results = [];

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await sleep(800);

  // 注入主题到 Web（存储键 secbot-theme；深色为 hacker 主题，浅色为 light）
  await page.evaluate((theme) => {
    try {
      const value = theme === "light" ? "light" : "hacker";
      localStorage.setItem("secbot-theme", value);
      const root = document.documentElement;
      root.setAttribute("data-theme", value);
      root.setAttribute("data-theme-pref", value);
      root.classList.toggle("dark", value !== "light");
    } catch {
      /* ignore */
    }
  }, THEME).catch(() => {});
  await page.reload({ waitUntil: "networkidle" }).catch(() => {});
  await sleep(600);

  async function safeClip(page, context, name, action, opts = {}) {
    try {
      return await recordClip(page, context, name, action, opts);
    } catch (err) {
      console.warn(`\n[skip] ${name} 失败: ${err instanceof Error ? err.message : String(err)}`);
      return { name, skipped: true };
    }
  }

  // 点击设置面板 tab（模型/Jev/外观/指令/MCP/技能/ExecGo/审计/关于/帮助）
  const clickSettingsTab = async (p, label) => {
    const tab = p.locator("button").filter({ hasText: label }).first();
    if (await tab.count()) {
      await tab.click();
      await sleep(700);
      return true;
    }
    return false;
  };

  results.push(
    await safeClip(page, context, "web-home", async (p) => {
      await sleep(1200);
      const input = p.locator("textarea").first();
      await input.click();
      await input.type("帮我梳理一次授权范围内的端口侦察流程", { delay: 28 });
      await sleep(900);
    }),
  );

  results.push(
    await safeClip(page, context, "web-tools", async (p) => {
      await p.goto(`${BASE}/settings?tab=help`, { waitUntil: "networkidle" });
      await sleep(900);
      // 帮助 tab：工具清单（核心/网络/侦察等分类）
      for (const label of ["核心", "网络", "侦察", "利用", "OSINT"]) {
        const row = p.getByText(label, { exact: false }).first();
        if (await row.count()) {
          await row.click().catch(() => {});
          await sleep(650);
        }
      }
    }, { intervalMs: 120, fps: 8 }),
  );

  results.push(
    await safeClip(page, context, "web-settings", async (p) => {
      await p.goto(`${BASE}/settings?tab=appearance`, { waitUntil: "networkidle" });
      await sleep(900);
      // 外观：主题（黑客绿 / 浅色 / 跟随系统）
      for (const label of ["黑客绿", "浅色", "跟随系统"]) {
        const opt = p.getByRole("button", { name: new RegExp(label) }).first();
        if (await opt.count()) {
          await opt.click().catch(() => {});
          await sleep(700);
        }
      }
      // 再看一下模型配置
      await clickSettingsTab(p, "模型");
      await sleep(900);
      await clickSettingsTab(p, "外观");
      await sleep(800);
    }),
  );

  results.push(
    await safeClip(page, context, "web-model", async (p) => {
      await p.goto(`${BASE}/settings?tab=model`, { waitUntil: "networkidle" });
      await sleep(900);
      const provider = p.locator("button").filter({ hasText: /DeepSeek|Ollama|模型|deepseek/i }).first();
      if (await provider.count()) {
        await provider.click().catch(() => {});
        await sleep(800);
      }
      await clickSettingsTab(p, "模型");
      await sleep(700);
    }),
  );

  results.push(
    await safeClip(page, context, "web-session", async (p) => {
      await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await sleep(500);
      const newChat = p.getByRole("button", { name: /新对话/ }).first();
      if (await newChat.count()) {
        await newChat.click().catch(() => {});
        await sleep(600);
      }
      const input = p.locator("textarea").first();
      await input.click();
      await input.type("/help", { delay: 40 });
      await sleep(400);
      await input.press("Enter");
      // 等待流式或空闲 UI；LLM 不可用也不失败
      await sleep(3500);
    }, { intervalMs: 140, fps: 7 }),
  );

  // 侧边栏演示：新建对话 + 展开右侧节点/终端栏
  results.push(
    await safeClip(page, context, "web-sidebar", async (p) => {
      await p.goto(BASE, { waitUntil: "networkidle" });
      await sleep(500);
      const newChat = p.getByRole("button", { name: /新对话/ }).first();
      if (await newChat.count()) {
        await newChat.click();
        await sleep(700);
      }
      // 展开右侧栏（节点/拓扑/终端）
      const rail = p.locator("button[title*='展开'],button[title*='收起']").first();
      if (await rail.count()) {
        await rail.click().catch(() => {});
        await sleep(900);
      }
      for (const label of ["节点", "拓扑", "终端"]) {
        const tab = p.getByRole("button", { name: label }).first();
        if (await tab.count()) {
          await tab.click().catch(() => {});
          await sleep(600);
        }
      }
    }),
  );

  // Static showcase still → short looping GIF
  if (!CLIP_FILTER || CLIP_FILTER.has("web-still-home")) {
    const name = "web-still-home";
    await page.goto(BASE, { waitUntil: "networkidle" });
    await sleep(500);
    const still = path.join(RAW_DIR, `${name}.png`);
    await page.screenshot({ path: still, type: "png" });
    const framesDir = path.join(RAW_DIR, name);
    fs.rmSync(framesDir, { recursive: true, force: true });
    fs.mkdirSync(framesDir, { recursive: true });
    for (let i = 0; i < 12; i++) {
      fs.copyFileSync(still, path.join(framesDir, `f${String(i).padStart(4, "0")}.png`));
    }
    const gifPath = path.join(OUT_DIR, `${name}-${THEME}.gif`);
    await run(FFMPEG, [
      "-y",
      "-framerate",
      "4",
      "-i",
      path.join(framesDir, "f%04d.png"),
      "-vf",
      "fps=4,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
      "-loop",
      "0",
      gifPath,
    ]);
    results.push({ name, gifPath, frames: 12, size: fs.statSync(gifPath).size });
    console.log(`[ok] ${gifPath}`);
  }

  await browser.close();
  console.log("\nDone:");
  for (const r of results) {
    console.log(`- ${r.name}: ${Math.round(r.size / 1024)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
