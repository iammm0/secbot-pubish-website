# Secbot 发布站点（secbot-publish-website）

基于 [Next.js](https://nextjs.org) 的 Secbot 发布与文档门户：首页（含 npm / PyPI 安装命令）、**站内文档**（Markdown 渲染）等。文档正文由上游 Secbot 的 `docs/` 同步至本仓库 [`docs/`](./docs/)，**仅在站内** `/docs`、`/docs/view/...` 预览，不依赖跳转到 GitHub 阅读文档。

> **合规提示**：Secbot 仅适用于获得明确授权的安全测试、研究与教学。请勿对未授权目标进行扫描或利用。

## 环境要求

- Node.js 20+（与 `package.json` 中 `@types/node` 一致即可；推荐与团队统一版本）
- npm 10+

## 本地开发

```bash
npm ci
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。语言可通过页面上的语言切换或 URL 查询参数 `?lang=zh-CN` / `?lang=en-US` 切换。

其他常用命令：

| 命令 | 说明 |
|------|------|
| `npm run build` | 生产构建（会预渲染全部文档页） |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | ESLint |
| `npm run sync:docs` | 从上游浅克隆并同步 `docs/`（见下文） |

## 同步上游文档

仓库内 [`scripts/sync-secbot-docs.sh`](./scripts/sync-secbot-docs.sh) 会将 [iammm0/secbot](https://github.com/iammm0/secbot) 的 `docs/` 同步到项目根目录 `docs/`。当前默认同步分支为 `pypi-release`，克隆目录位于 `vendor/_secbot-upstream/`（已加入 `.gitignore`，且不参与 TypeScript/ESLint 检查）。

也可通过环境变量指定其他分支或引用：

```bash
npm run sync:docs
# 或
REF=main bash scripts/sync-secbot-docs.sh
```

同步后会更新 `docs/SOURCE.txt`（记录时间与上游提交），并将 [`scripts/templates/docs-hub-README.md`](./scripts/templates/docs-hub-README.md) 复制为 `docs/README.md`（本站导览；仅根目录 `docs/README.md` 在 rsync 中被排除，以免被上游覆盖）。

## 项目结构（摘要）

| 路径 | 说明 |
|------|------|
| [`app/`](./app/) | App Router 页面与布局 |
| [`app/docs/`](./app/docs/) | 文档中心 `/docs`（导读与分层参考 [execgo.site/docs](https://execgo.site/docs) 信息架构） |
| [`app/docs/view/[[...slug]]/`](./app/docs/view/) | 单篇文档 `/docs/view/...` |
| [`docs/`](./docs/) | 同步自上游的 Markdown 与 `SOURCE.txt` |
| [`scripts/`](./scripts/) | 文档同步脚本与导览模板 |
| [`src/components/`](./src/components/) | 站点组件（含 `doc-markdown`） |
| [`src/i18n/`](./src/i18n/) | 中英文文案 |
| [`src/lib/docs-fs.ts`](./src/lib/docs-fs.ts) | 文档路径列举与 slug 解析 |

## 部署

构建产物为标准 Next.js 应用，可部署至支持 Node 的平台（如 Vercel、自有服务器等）。部署前请执行 `npm run build` 确认通过。

## 相关链接

- 上游项目：<https://github.com/iammm0/secbot>
- Next.js 文档：<https://nextjs.org/docs>
