import { defaultLocale, type Locale } from "@/src/i18n/config";
import enUS from "@/src/i18n/messages/en-US";
import zhCN from "@/src/i18n/messages/zh-CN";

export type SiteMessages = typeof zhCN;

const dict: Record<Locale, SiteMessages> = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

export function getMessages(locale: Locale): SiteMessages {
  return dict[locale] ?? dict[defaultLocale];
}
