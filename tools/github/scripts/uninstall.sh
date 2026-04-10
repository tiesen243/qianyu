#!/bin/bash

APP_NAME="Qianyu"
APP_EXEC_NAME="qianyu"

BIN_DIR="$HOME/.local/bin"
APP_DIR="$HOME/.local/share/applications"
ICON_DIR="$HOME/.local/share/icons"

APP_PATH="$BIN_DIR/$APP_EXEC_NAME.AppImage"
DESKTOP_FILE="$APP_DIR/$APP_EXEC_NAME.desktop"
ICON_PATH="$ICON_DIR/$APP_EXEC_NAME.png"

echo "Uninstalling $APP_NAME..."

# Remove files
rm -f "$APP_PATH"
rm -f "$DESKTOP_FILE"
rm -f "$ICON_PATH"

# Update desktop database
update-desktop-database "$APP_DIR" 2>/dev/null || true

echo "Uninstallation complete. $APP_NAME has been removed from your system."
