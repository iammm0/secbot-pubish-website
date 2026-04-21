#!/usr/bin/env bash
# 从 iammm0/secbot 浅克隆并同步 docs/ 到项目根目录。
# 默认同步 pypi-release 与 npm-release 两条发布分支。
# 用法：
#   ./scripts/sync-secbot-docs.sh
#   REF=pypi-release ./scripts/sync-secbot-docs.sh
#   REFS="pypi-release npm-release" ./scripts/sync-secbot-docs.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UPSTREAM_DIR="${UPSTREAM_DIR:-$ROOT/vendor/_secbot-upstream}"
REFS="${REF:-${REFS:-pypi-release npm-release}}"
REPO_URL="${REPO_URL:-https://github.com/iammm0/secbot.git}"

mkdir -p "$ROOT/vendor"

if [[ ! -d "$UPSTREAM_DIR/.git" ]]; then
  rm -rf "$UPSTREAM_DIR"
  git clone --depth 1 "$REPO_URL" "$UPSTREAM_DIR"
fi

mkdir -p "$ROOT/docs"
# 清理旧版单分支同步留在 docs 根目录的内容，保留分支目录和本站导览。
find "$ROOT/docs" -mindepth 1 -maxdepth 1 \
  ! -name 'README.md' \
  ! -name 'SOURCE.txt' \
  ! -name 'pypi-release' \
  ! -name 'npm-release' \
  -exec rm -rf {} +

SYNC_TIME="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
{
  echo "同步时间(UTC): ${SYNC_TIME}"
  echo "上游仓库: ${REPO_URL}"
  echo "分支/引用: ${REFS}"
  echo "说明: 由 scripts/sync-secbot-docs.sh 生成；正文 Markdown 按发布分支分别位于 docs/<branch>/。"
  echo
} >"$ROOT/docs/SOURCE.txt"

for REF in $REFS; do
  git -C "$UPSTREAM_DIR" fetch --depth 1 origin "$REF"
  git -C "$UPSTREAM_DIR" checkout -B "$REF" "FETCH_HEAD"

  TARGET_DIR="$ROOT/docs/$REF"
  mkdir -p "$TARGET_DIR"
  rsync -a --delete "$UPSTREAM_DIR/docs/" "$TARGET_DIR/"

  COMMIT="$(git -C "$UPSTREAM_DIR" rev-parse HEAD)"
  cat >"$TARGET_DIR/SOURCE.txt" <<EOF
同步时间(UTC): ${SYNC_TIME}
上游仓库: ${REPO_URL}
分支/引用: ${REF}
上游提交: ${COMMIT}
说明: 由 scripts/sync-secbot-docs.sh 生成；正文 Markdown 来自上游 docs/。
EOF

  {
    echo "分支/引用: ${REF}"
    echo "上游提交: ${COMMIT}"
    echo
  } >>"$ROOT/docs/SOURCE.txt"

  echo "Docs synced from ${REPO_URL} (${REF} @ ${COMMIT}) -> ${TARGET_DIR}"
done

cp "$ROOT/scripts/templates/docs-hub-README.md" "$ROOT/docs/README.md"
