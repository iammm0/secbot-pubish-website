# Secbot 文档导览

本站 `docs/` 目录由上游 Secbot 开源项目的 `docs/` 同步而来（同步记录见同目录 `SOURCE.txt`）。**当前唯一维护的上游分支是 `release`**。

> Python 的 `pypi-release` 与 Go 的 `pure-go` 已冻结，只作历史归档。新功能与文档请以 `release` 为准。站内现行文档入口是 `/docs/secbot`（对应上游 `release`），不要再把 `pypi-release` / 旧 `npm-release` 路径当作默认安装指南。

| 上游分支 | 状态 | 站内入口 |
|----------|------|----------|
| `release` | **唯一维护中** · TypeScript / NestJS / TUI / Web · Desktop | `/docs/secbot` |
| `pypi-release` | **已冻结** · Python CLI / FastAPI 历史文档 | `/docs/secbot/pypi-release`（归档） |
| 旧 `npm-release` 快照 | 历史镜像，已被 `release` 取代 | `/docs/secbot/npm-release`（归档） |

## 常用入口（当前产品）

| 文档 | 路径 |
|------|------|
| 快速开始 | `/docs/secbot/quickstart` |
| API | `/docs/secbot/api` |
| 模型提供商 | `/docs/secbot/llm-providers` |
| 部署 | `/docs/secbot/deployment` |
| 发布流程 | `/docs/secbot/release` |

历史兼容路径 `/docs/view/...` 以及 `/docs/secbot/pypi-release/...` 仅用于查阅旧 Python 文档，不再作为新用户入口。

正文内若含有指向**源码树**的相对链接，在站内可能无法解析，需结合本地克隆的 Secbot 工程查看对应文件。
