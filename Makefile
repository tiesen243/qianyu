pkm = bun

help:
	@echo "Available commands:"
	@echo "  make clean           - Clean build artifacts and node_modules"
	@echo "  make dev             - Start the development server"
	@echo "  make build-packages - Build all packages except @qianyu/web"
	@echo "  make build           - Build the entire application and all packages"


clean:
	@echo "Cleaning build artifacts..."
	@${pkm} --filter '*' clean
	@git clean -fdx .alchemy node_modules

dev:
	@$(pkm) --filter @qianyu/infra dev

build-packages:
	@$(pkm) --filter '@qianyu/api' --filter './packages/*' build

build:
	@$(pkm) --filter '*' build

build-android:
	@cd apps/mobile/android
	@./gradlew assembleRelease

build-desktop:
	@${pkm} --filter @qianyu/desktop tauri build

