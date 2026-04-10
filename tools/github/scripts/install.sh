#!/bin/bash

APP_URL=$(curl -s "https://api.github.com/repos/tiesen243/qianyu/releases/latest" | grep "browser_download_url.*ubuntu-latest\.AppImage" | cut -d '"' -f 4)

if [ -z "$APP_URL" ]; then
  echo "Error: Could not find latest AppImage URL."
  exit 1
fi

echo "Installing Qianyu from $APP_URL..."

APP_NAME="Qianyu"
APP_EXEC_NAME="qianyu"

BIN_DIR="$HOME/.local/bin"
APP_DIR="$HOME/.local/share/applications"
ICON_DIR="$HOME/.local/share/icons"

APP_PATH="$BIN_DIR/$APP_EXEC_NAME.AppImage"
DESKTOP_FILE="$APP_DIR/$APP_EXEC_NAME.desktop"
ICON_PATH="$ICON_DIR/$APP_EXEC_NAME.png"

mkdir -p "$BIN_DIR" "$APP_DIR" "$ICON_DIR"

curl -L -o "$APP_PATH" "$APP_URL"
chmod +x "$APP_PATH"

cd /tmp
"$APP_PATH" --appimage-extract >/dev/null 2>&1
if [ -f "squashfs-root/qianyu.png" ]; then
  cp "squashfs-root/qianyu.png" "$ICON_PATH"
else
  echo "Warning: No icon found in AppImage."
fi
rm -rf squashfs-root
cd - >/dev/null

echo "Creating desktop entry..."
cat >"$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=$APP_NAME
Exec=$APP_PATH --no-sandbox %U
Icon=$ICON_PATH
Type=Application
Categories=Utility;
Terminal=false
EOF

update-desktop-database "$APP_DIR" 2>/dev/null || true

echo "Installation complete! You can now launch $APP_NAME from your application menu."
