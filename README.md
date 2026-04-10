# Qianyu

<p align="center">
  <a href="https://github.com/tiesen243/qianyu/releases?q=api">
    <img src="https://img.shields.io/github/package-json/v/tiesen243/qianyu?filename=apps/api/package.json&label=version@api" alt="Version API">
  </a>
  <a href="https://github.com/tiesen243/qianyu/releases?q=desktop">
    <img src="https://img.shields.io/github/package-json/v/tiesen243/qianyu?filename=apps/desktop/package.json&label=version@desktop" alt="Version Desktop">
  </a>
  <a href="https://github.com/tiesen243/qianyu/releases?q=web">
    <img src="https://img.shields.io/github/package-json/v/tiesen243/qianyu?filename=apps/web/package.json&label=version@web" alt="Version Web">
  </a>
  <a href="https://github.com/tiesen243/qianyu/releases?q=mobile">
    <img src="https://img.shields.io/github/package-json/v/tiesen243/qianyu?filename=apps/mobile/package.json&label=version@mobile" alt="Version Mobile">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/tiesen243/qianyu" alt="License">
  </a>
</p>

<p align="center">
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/ci.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/release.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/release.yml/badge.svg" alt="Release">
  </a>
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/publish.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/publish.yml/badge.svg" alt="Publish">
  </a>
</p>

## Overview

Qianyu is a modern monorepo containing multiple applications and shared packages, all sharing optimized developer tooling and CI/CD pipelines.

### Apps

- **API** (`apps/api`): Backend server built with [Elysia.js](https://elysiajs.com/), [Drizzle ORM](https://orm.drizzle.team/), and [Effect](https://effect.website/). Deployed to Cloudflare Workers via [Alchemy](https://alchemy.run/).
- **Desktop** (`apps/desktop`): Cross-platform desktop application built with [Tauri](https://tauri.app/) (Rust) + React. Communicates with embedded firmware over a serial port.
- **Web** (`apps/web`): Web application built with [React Router](https://reactrouter.com/). Deployed to Cloudflare Workers.
- **Mobile** (`apps/mobile`): Bare [React Native](https://reactnative.dev/) application with [React Navigation](https://reactnavigation.org/) and [HeroUI Native](https://heroui.net/). Builds automated APKs via GitHub Actions.

### Packages

- **Firmware** (`packages/firmware`): Arduino/ESP8266 firmware that connects to the API over Wi-Fi using Server-Sent Events (SSE).
- **Lib** (`packages/lib`): Shared library providing a typed API client and [TanStack Query](https://tanstack.com/query) utilities for use across apps.
- **UI** (`packages/ui`): Shared React component library built with Tailwind CSS.

### Tools

- **GitHub** (`tools/github`): Shared GitHub Actions composite actions and release scripts.
- **Infra** (`tools/infra`): Cloudflare infrastructure definitions using [Alchemy](https://alchemy.run/) (D1 database, Durable Objects, Workers, React Router deployment).
- **Oxc** (`tools/oxc`): Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration.
- **TypeScript** (`tools/typescript`): Shared TypeScript (`tsconfig`) base configurations.

## Tech Stack

- **API**: Elysia.js, Drizzle ORM, Effect, Zod, Cloudflare Workers (D1, Durable Objects)
- **Desktop**: Tauri (Rust), React, React Router, Vite
- **Web**: React Router, Cloudflare Workers
- **Mobile**: Bare React Native, React Navigation, HeroUI Native
- **Firmware**: Arduino / ESP8266 (C++)
- **Styling**: Tailwind CSS
- **Language**: TypeScript (all JS apps), Rust (Tauri backend), C++ (firmware)
- **Package Manager**: Bun
- **Tooling**: Oxlint & Oxfmt for high-performance linting and formatting
- **CI/CD**: GitHub Actions for automated builds, deployments, and releases

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.com/)
- [Rust](https://www.rust-lang.org/tools/install) (for Desktop App)
- [Android SDK](https://developer.android.com/studio) (for Mobile App)
- [JDK 17 or higher](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (for Mobile App)
- [Arduino IDE](https://www.arduino.cc/en/software) with ESP8266 board support (for Firmware)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tiesen243/qianyu.git
cd qianyu
bun install
```

### Development

#### API

The API requires Cloudflare D1 and Durable Object bindings to be injected at dev time. Run the dev server from the `infra` package so that these bindings are available:

```bash
bun --filter @qianyu/infra dev
```

#### Desktop App

To start the desktop app in development mode:

```bash
cd apps/desktop
bun run tauri dev
```

#### Web App

The web app also depends on the Cloudflare D1 and Durable Object bindings provided by the infra package. Start both the web app and API together with:

```bash
bun --filter @qianyu/infra dev
```

#### Mobile App

To start the Metro bundler and run the app on an Android emulator or device:

```bash
cd apps/mobile
bun run start
# In another terminal:
bun run android
```

#### Firmware

1. Copy `packages/firmware/config.h.example` to `packages/firmware/config.h` and fill in your Wi-Fi credentials and API URL.
2. Open `packages/firmware/firmware.ino` in the Arduino IDE and flash it to your ESP8266 board.

## Deployment & Workflows

This project uses **GitHub Actions** to automate code quality checks, releases, and deployments.

### CI/CD Pipelines

1. **CI (`ci.yml`)**: Runs on every push and pull request to ensure code quality:
   - Code formatting check (Oxfmt)
   - Linting (Oxlint)
   - Type checking (TypeScript)

2. **Release (`release.yml`)**: Handles versioning and release management using [Changesets](https://github.com/changesets/changesets):
   - Opens a versioning PR that bumps package versions and generates changelogs.
   - Tags the release commit, which triggers the Publish workflow.

3. **Publish (`publish.yml`)**: Triggered on version tags — deploys each app independently:
   - **Web & API** (`@qianyu/web@*`): Deploys via Alchemy to Cloudflare Workers (production stage).
   - **Mobile** (`@qianyu/mobile@*`): Builds a signed Android APK and uploads it to the GitHub Release.
   - **Desktop** (`@qianyu/desktop@*`): Builds Tauri bundles for Linux, Windows, and macOS and uploads all installers to the GitHub Release.

4. **PR Preview (`pr-preview.yml`)**: Deploys a preview of the web app and API on pull requests.

### Configuring GitHub Secrets

Set the following repository secrets before running the publish workflows:

**Cloudflare / Alchemy (Web & API deployment):**

- `ALCHEMY_PASSWORD`: Generated by `openssl rand -base64 32`
- `ALCHEMY_STATE_TOKEN`: Generated by `openssl rand -base64 32`
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token with permissions: `Workers Scripts:Edit`, `Workers KV Storage:Edit`, `Workers R2 Storage:Edit`, `Workers Tail:Read`, `Workers Builds Configuration:Edit`, `Workers Observability:Edit`, `Workers Agents Configuration:Edit`, `Containers:Edit`, `Cloudflare Pages:Edit`, `Account Settings:Read`
- `CLOUDFLARE_EMAIL`: Your Cloudflare Account Email
- `CORS_ORIGINS`: Comma-separated list of allowed CORS origins for the API

**General:**

- `PAT_TOKEN`: GitHub Personal Access Token with `repo` and `workflow` permissions
- `PUBLIC_API_URL`: The publicly accessible URL of the deployed API (used by Web, Mobile, and Desktop builds)

**Mobile APK signing:**

1. Generate a keystore:

   ```bash
   keytool -genkeypair -v -storetype PKCS12 \
   -keystore my-release-key.keystore \
   -alias my-key-alias \
   -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Base64 encode the keystore:

   ```bash
   base64 my-release-key.keystore > my-release-key.keystore.base64
   ```

3. Set signing secrets:
   - `RN_UPLOAD_KEY_ALIAS`: The alias of the key in your keystore
   - `RN_UPLOAD_STORE_BASE64`: The base64-encoded content of your keystore file
   - `RN_UPLOAD_STORE_PASSWORD`: The password for your keystore

4. Set deep-linking secrets:
   - `RN_SCHEME`: The URI scheme for deep links (e.g. `myapp`)
   - `RN_PREFIX`: The full deep-link prefix (e.g. `myapp://`)

5. Optionally, generate the SHA256 fingerprint for Android deep linking:

   ```bash
   keytool -list -v -keystore my-release-key.keystore
   ```

   Copy the SHA256 fingerprint and add it to `apps/web/public/.well-known/assetlinks.json`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
