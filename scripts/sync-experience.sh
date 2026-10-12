#!/usr/bin/env bash
# Pulls the immersive experience app (jackmielke/cwb-experience) into this repo.
# Usage: scripts/sync-experience.sh /path/to/cwb-experience
# Source goes to experience/src, static files to public/experience, served at /experience/.
set -euo pipefail
SRC="${1:?path to a cwb-experience checkout}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
rm -rf "$ROOT/experience/src" "$ROOT/public/experience"
mkdir -p "$ROOT/experience" "$ROOT/public/experience"
cp -R "$SRC/src" "$ROOT/experience/src"
cp -R "$SRC/public/." "$ROOT/public/experience/"
# Same page, with the entry script pointed at the copied source.
sed 's#src="/src/main.tsx"#src="/experience/src/main.tsx"#' "$SRC/index.html" > "$ROOT/experience/index.html"
echo "Synced experience from $SRC"
