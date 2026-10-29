# SecBot 发布站点（secbot-publish-website）

这是 SecBot 的中文发布与文档站点，基于 Next.js App Router 与 Fumadocs MDX 构建。站内文档不再按历史发布分支展开，而是按读者任务组织为三段：

- `/docs/ecosystem`：产品定位、版本边界、仓库边界和执行模型。
- `/docs/secbot`：主项目使用文档，以站内维护为主；`features` 页持续与本地 `../secbot` 的 `README_CN.md` 对齐。
- `/docs/runtime`：SecBot 内部运行与执行链路说明；这里的 runtime 不是独立仓库。

> 合规提示：SecBot 仅适用于获得明确授权的安全测试、研究与教学。请勿对未授权目标进行扫描、利用或远程控制。

## 环境要求

- Node.js 20+（建议与团队统一版本）
- npm 10+
- 本地同级目录存在 `../secbot`

## 本地开发

```bash
npm ci
npm run sync:docs
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

常用命令：

| 命令 | 说明 |
| --- | --- |
| `npm run sync:docs` | 生成 `features` 页（来自本地 `../secbot` 的 `README_CN.md`），其余文档为站内维护并原样保留 |
| `npm run dev` | 启动 Next.js 开发服务器 |
| `npm run build` | 生产构建，并生成 Fumadocs `.source` 数据 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | ESLint 检查 |

## 文档同步

同步脚本入口为 [`scripts/sync-docs-content.mjs`](./scripts/sync-docs-content.mjs)，核心实现位于 [`scripts/sync-secbot-docs.mjs`](./scripts/sync-secbot-docs.mjs)。上游 `secbot` 仓库已不再维护仓库内 `docs/`（以官网为文档真源），因此本站文档以站内维护为主。

同步规则：

- `features.mdx` 由 `../secbot` 的 `README_CN.md` 生成（唯一仍与上游同步的页面）。
- `content/docs/ecosystem/*`、`content/docs/runtime/*` 与其余 `content/docs/secbot/*` 都是站内维护页面；`sync:docs` 只会保留它们，不会因缺少上游源文件而误删。
- 同步会重新生成各分区 `meta.json`（含 `secbot` 段的 `benchmark` 页）。
- 如果 `features.mdx` 中的链接对应站内页面，脚本会重写为 `/docs/...`；否则回退到 GitHub `iammm0/secbot` 的 `release` 分支源文件。
- 脚本会转义 MDX 表达式、处理 `<placeholder>` 与自动链接，并规避 Fumadocs/Shiki 对部分代码块语言的限制。

## 项目结构

| 路径 | 说明 |
| --- | --- |
| [`app/`](./app/) | Next.js App Router 页面与布局 |
| [`app/docs/[[...slug]]/`](./app/docs/[[...slug]]/) | Fumadocs 文档路由 |
| [`content/docs/`](./content/docs/) | MDX 文档内容与 Fumadocs `meta.json` |
| [`mdx-components.tsx`](./mdx-components.tsx) | 站内 MDX 组件映射 |
| [`source.config.ts`](./source.config.ts) | Fumadocs MDX 配置 |
| [`src/lib/source.ts`](./src/lib/source.ts) | Fumadocs source loader |
| [`src/lib/docs-nav.ts`](./src/lib/docs-nav.ts) | 文档侧边栏顺序与上一篇/下一篇 |
| [`scripts/sync-docs-content.mjs`](./scripts/sync-docs-content.mjs) | 文档同步入口（`features` 页生成 + 站内页面保留） |
| [`scripts/sync-secbot-docs.mjs`](./scripts/sync-secbot-docs.mjs) | 文档同步实现（仅从 `README_CN.md` 生成 `features`） |

## 部署

构建产物为标准 Next.js 应用，可部署至 Vercel 或自有 Node.js 服务。部署前请执行：

```bash
npm run sync:docs
npm run lint
npm run build
```

## 相关链接

- 上游主项目：[iammm0/secbot](https://github.com/iammm0/secbot)
- 文档布局参考：[iammm0/damn-agent](https://github.com/iammm0/damn-agent)
- Next.js 文档：[nextjs.org/docs](https://nextjs.org/docs)
