#!/usr/bin/env bash
# 从 iammm0/secbot 浅克隆并同步 docs/ 到项目根目录。
# 用法：REF=main ./scripts/sync-secbot-docs.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UPSTREAM_DIR="${UPSTREAM_DIR:-$ROOT/vendor/_secbot-upstream}"
REF="${REF:-main}"
REPO_URL="${REPO_URL:-https://github.com/iammm0/secbot.git}"

mkdir -p "$ROOT/vendor"

if [[ -d "$UPSTREAM_DIR/.git" ]]; then
  git -C "$UPSTREAM_DIR" fetch --depth 1 origin "$REF"
  git -C "$UPSTREAM_DIR" checkout -B "$REF" "FETCH_HEAD"
else
  rm -rf "$UPSTREAM_DIR"
  git clone --depth 1 --branch "$REF" "$REPO_URL" "$UPSTREAM_DIR"
fi

mkdir -p "$ROOT/docs"
# 保留本站维护的 docs/README.md（导览），其余与上游 docs 对齐
rsync -a --delete \
  --exclude='README.md' \
  "$UPSTREAM_DIR/docs/" "$ROOT/docs/"

COMMIT="$(git -C "$UPSTREAM_DIR" rev-parse HEAD)"
SYNC_TIME="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

cat >"$ROOT/docs/SOURCE.txt" <<EOF
同步时间(UTC): ${SYNC_TIME}
上游仓库: ${REPO_URL}
分支/引用: ${REF}
上游提交: ${COMMIT}
说明: 由 scripts/sync-secbot-docs.sh 生成；正文 Markdown 来自上游 docs/。
EOF

cp "$ROOT/scripts/templates/docs-hub-README.md" "$ROOT/docs/README.md"

echo "Docs synced from ${REPO_URL} (${REF} @ ${COMMIT}) -> $ROOT/docs"
