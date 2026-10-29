export type Platform = {
  os: "macos" | "windows" | "linux";
  arch: "arm64" | "x64";
};

type Os = Platform["os"];

function archFromStrings(...values: string[]): "arm64" | "x64" | null {
  const joined = values.join(" ");
  if (/arm64|aarch64|arch:["']?arm/i.test(joined)) return "arm64";
  if (/x86_64|amd64|win64|x64|arch:["']?x86/i.test(joined)) return "x64";
  return null;
}

/** userAgentData.architecture 返回裸值（"arm"/"arm64"/"x86"/"x64"），单独精确匹配。 */
function archFromDataArchitecture(value?: string): "arm64" | "x64" | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v === "arm" || v === "arm64" || v === "aarch64") return "arm64";
  if (v === "x86" || v === "x64" || v === "x86_64" || v === "amd64" || v === "win64") return "x64";
  return null;
}

function osFromPlatform(platform: string): Os | null {
  if (/^mac/i.test(platform)) return "macos";
  if (/^win/i.test(platform)) return "windows";
  if (/^linux/i.test(platform)) return "linux";
  return null;
}

/**
 * 根据 UA、userAgentData.platform / architecture 与 navigator.platform
 * 判定访问者操作系统与架构。Android / 无法识别时返回 null，
 * 调用方将平铺展示全部平台而不推荐。纯函数，不直接访问 navigator。
 */
export function detectPlatform(
  userAgent: string,
  uaDataPlatform?: string,
  uaDataArchitecture?: string,
  navigatorPlatform?: string,
): Platform | null {
  // (a) userAgentData.platform 最可靠；architecture 精确判定 arm/x86
  if (uaDataPlatform) {
    const os = osFromPlatform(uaDataPlatform);
    if (os) {
      const arch = archFromDataArchitecture(uaDataArchitecture) ?? archFromStrings(userAgent, uaDataPlatform);
      return { os, arch: arch ?? "x64" };
    }
  }

  // (b) navigator.platform 回退
  if (navigatorPlatform) {
    const os = osFromPlatform(navigatorPlatform);
    if (os) {
      const arch = archFromStrings(userAgent, navigatorPlatform);
      return { os, arch: arch ?? "x64" };
    }
  }

  // (c) UA 特征串兜底（排除 Android）
  let os: Os | null = null;
  if (/android/i.test(userAgent)) return null;
  if (/macintosh|mac os/i.test(userAgent)) os = "macos";
  else if (/windows nt|win64|win32/i.test(userAgent)) os = "windows";
  else if (/linux|ubuntu|debian|fedora|centos/i.test(userAgent)) os = "linux";
  if (!os) return null;

  const arch = archFromStrings(userAgent);
  return { os, arch: arch ?? "x64" };
}
