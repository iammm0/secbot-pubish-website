# Secbot 文档导览

本站 `docs/` 目录由上游 Secbot 开源项目的 `docs/` 同步而来（同步记录见同目录 `SOURCE.txt`）。当前发布站按上游发布分支拆分文档：

| 发布分支 | 版本路线 | 站内入口 |
|----------|----------|----------|
| `pypi-release` | Python CLI / FastAPI / PyPI | `/docs/secbot/pypi-release` |
| `npm-release` | TypeScript / Node.js / npm | `/docs/secbot/npm-release` |

## 常用入口

| 文档 | pypi-release | npm-release |
|------|--------------|-------------|
| 快速开始 | `/docs/secbot/pypi-release/quickstart` | `/docs/secbot/npm-release/quickstart` |
| API | `/docs/secbot/pypi-release/api` | `/docs/secbot/npm-release/api` |
| 模型提供商 | `/docs/secbot/pypi-release/llm-providers` | `/docs/secbot/npm-release/llm-providers` |
| 部署 | `/docs/secbot/pypi-release/deployment` | `/docs/secbot/npm-release/deployment` |
| 发布流程 | `/docs/secbot/pypi-release/release` | `/docs/secbot/npm-release/release` |

## 分支差异

- `pypi-release` 删除了旧的 Node / UI 专属说明，更聚焦 Python CLI、`secbot server` 与 SQLite 持久化配置。
- `npm-release` 保留并更新了 Node 环境、Terminal UI、NestJS 后端与 TypeScript 迁移状态等文档。
- 历史兼容路径 `/docs/view/...` 会跳转到默认的 `pypi-release` 文档；新的站内链接请优先使用 `/docs/secbot/<branch>/...`。

正文内若含有指向**源码树**的相对链接，在站内可能无法解析，需结合本地克隆的 Secbot 工程查看对应文件。
