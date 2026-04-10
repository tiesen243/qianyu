pkm = bun

help:
	@echo "Available commands:"
	@echo "  make all           Build all packages and applications"
	@echo "  make clean         Clean all build artifacts and node_modules"
	@echo "  make deps          Build shared dependencies"
	@echo "  make dev-web       Start development server for web application"
	@echo "  make dev-android   Start development server for Android application"
	@echo "  make dev-desktop   Start development server for desktop application"
	@echo "  make setup         Install dependencies and set up environment files"

all:
	@$(pkm) --filter '@qianyu/api' --filter '@qianyu/dev' --filter './packages/*' build
	@NO_STRIP=true $(pkm) --filter '@qianyu/desktop' tauri build
	# @cd ./apps/mobile/android && ./gradlew assembleRelease # not recommended, use Github Actions instead

clean:
	@$(pkm) --filter '*' clean
	@git clean -fdX .alchemy node_modules

deps:
	@$(pkm) --filter '@qianyu/api' --filter './packages/*' build

dev-web:
	@$(pkm) --filter @qianyu/infra dev

dev-android:
	@$(pkm) --filter @qianyu/mobile start

dev-desktop:
	@$(pkm) --filter @qianyu/desktop tauri dev

setup:
	@echo "Installing dependencies..."
	@$(pkm) ci

	@echo "Setting up environment files..."
	@cp tools/infra/.env.example tools/infra/.env
	@cp apps/desktop/.env.example apps/desktop/.env
	@cp apps/mobile/.env.example apps/mobile/.env
	@cp packages/firmware/config.h.example packages/firmware/config.h

	@echo "Generating random secrets for ALCHEMY..."
	@sed -i "s|^ALCHEMY_PASSWORD=.*|ALCHEMY_PASSWORD=$$(openssl rand -base64 32)|" ./tools/infra/.env
	@sed -i "s|^ALCHEMY_STATE_TOKEN=.*|ALCHEMY_STATE_TOKEN=$$(openssl rand -base64 32)|" ./tools/infra/.env

