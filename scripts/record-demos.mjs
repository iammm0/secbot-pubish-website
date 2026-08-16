/**
 * Record SecBot Web UI demos with Playwright (system Chrome) and export GIF via ffmpeg.
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
const FFMPEG = path.join(ROOT, "tools", "ffmpeg", "ffmpeg.exe");
const BASE = process.env.SECBOT_DEMO_URL || "http://127.0.0.1:8000";

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
  const webmPath = path.join(RAW_DIR, `${name}.webm`);
  const gifPath = path.join(OUT_DIR, `${name}.gif`);
  console.log(`\n[record] ${name}`);

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
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const results = [];

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await sleep(800);

  results.push(
    await recordClip(page, context, "web-home", async (p) => {
      await sleep(1200);
      const input = p.locator("textarea").first();
      await input.click();
      await input.type("帮我梳理一次授权范围内的端口侦察流程", { delay: 28 });
      await sleep(900);
    }),
  );

  results.push(
    await recordClip(page, context, "web-sidebar", async (p) => {
      const expand = p.locator("aside button").filter({ hasText: "▶" }).first();
      if (await expand.count()) {
        await expand.click();
        await sleep(700);
      }
      const newChat = p.getByRole("button", { name: /New Chat|\+/ }).first();
      await newChat.click();
      await sleep(900);
      const collapse = p.locator("aside button").filter({ hasText: "◀" }).first();
      if (await collapse.count()) {
        await collapse.click();
        await sleep(600);
      }
    }),
  );

  results.push(
    await recordClip(page, context, "web-settings", async (p) => {
      const expand = p.locator("aside button").filter({ hasText: "▶" }).first();
      if (await expand.count()) await expand.click();
      await sleep(400);
      const settingsBtn = p.getByRole("button", { name: /Settings|⚙/ }).first();
      if (await settingsBtn.count()) {
        await settingsBtn.click();
      } else {
        // collapsed settings gear
        const gear = p.locator("aside button").filter({ hasText: "⚙" }).first();
        await gear.click();
      }
      await sleep(800);
      for (const label of ["主题", "帮助与工具", "模型配置"]) {
        const tab = p.getByRole("button", { name: label });
        if (await tab.count()) {
          await tab.click();
          await sleep(700);
        }
      }
      await p.locator("button", { hasText: "×" }).first().click().catch(async () => {
        await p.keyboard.press("Escape");
      });
      await sleep(500);
    }),
  );

  results.push(
    await recordClip(page, context, "web-session", async (p) => {
      await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await sleep(500);
      const expand = p.locator("aside button").filter({ hasText: "▶" }).first();
      if (await expand.count()) await expand.click();
      await sleep(300);
      await p.getByRole("button", { name: /New Chat|\+/ }).first().click();
      await sleep(600);
      const input = p.locator("textarea").first();
      await input.click();
      await input.type("/help", { delay: 40 });
      await sleep(400);
      await input.press("Enter");
      // Wait for stream or idle UI; don't fail if LLM unavailable
      await sleep(3500);
    }, { intervalMs: 140, fps: 7 }),
  );

  results.push(
    await recordClip(page, context, "web-tools", async (p) => {
      await p.goto(BASE, { waitUntil: "networkidle" });
      await sleep(400);
      const expand = p.locator("aside button").filter({ hasText: "▶" }).first();
      if (await expand.count()) await expand.click();
      await sleep(300);
      await p.locator("aside button").filter({ hasText: "⚙" }).first().click();
      await sleep(500);
      await p.getByRole("button", { name: "帮助与工具" }).click();
      await sleep(700);
      for (const label of ["Core Security", "Defense", "OSINT", "Web Research"]) {
        const row = p.getByText(label, { exact: true }).first();
        if (await row.count()) {
          await row.click();
          await sleep(650);
        }
      }
    }, { intervalMs: 120, fps: 8 }),
  );

  results.push(
    await recordClip(page, context, "web-model", async (p) => {
      const open = async () => {
        if (await p.getByText("设置").count()) return;
        const expand = p.locator("aside button").filter({ hasText: "▶" }).first();
        if (await expand.count()) await expand.click();
        await p.locator("aside button").filter({ hasText: "⚙" }).first().click();
        await sleep(400);
      };
      await open();
      await p.getByRole("button", { name: "模型配置" }).click();
      await sleep(1000);
      await p.getByRole("button", { name: "主题" }).click();
      await sleep(900);
      await p.getByRole("button", { name: "模型配置" }).click();
      await sleep(1000);
    }),
  );

  // Static showcase still → short looping GIF
  {
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
    const gifPath = path.join(OUT_DIR, `${name}.gif`);
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
