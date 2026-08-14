import zhCN from "@/src/i18n/messages/zh-CN";

export type SiteMessages = typeof zhCN;

/** 站点文案（仅中文，不再做语言切换） */
export const messages: SiteMessages = zhCN;

export function getMessages(): SiteMessages {
  return messages;
}
