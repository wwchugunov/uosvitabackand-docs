#!/bin/sh
set -eu

DOCS_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -x "$CHROME_BIN" ]; then
  echo "Google Chrome не знайдено: $CHROME_BIN" >&2
  exit 1
fi

"$CHROME_BIN" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$DOCS_DIR/e-osvita-university-integration-guide.pdf" \
  "file://$DOCS_DIR/index.html"

"$CHROME_BIN" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$DOCS_DIR/e-osvita-application-overview.pdf" \
  "file://$DOCS_DIR/application-overview.html"

"$CHROME_BIN" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$DOCS_DIR/e-osvita-developer-handover.pdf" \
  "file://$DOCS_DIR/developer-handover.html"
