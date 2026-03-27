# Qianyu

<p align="center">
  <a href="https://github.com/tiesen243/qianyu/releases">
    <img src="https://img.shields.io/github/package-json/v/tiesen243/qianyu?filename=apps/web/package.json&label=version@web" alt="Version Web">
  </a>
  <a href="https://github.com/tiesen243/qianyu/releases">
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
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/build-apk.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/build-apk.yml/badge.svg" alt="Build APK">
  </a>
</p>

## Overview

Qianyu is a modern monorepo containing a web application and a mobile application, sharing optimized developer tooling and CI/CD pipelines.

The monorepo contains 2 main applications:
- **Web App** (`apps/web`): Built with React Router, with CI configured for automated deployment to Cloudflare Workers.
- **Mobile App** (`apps/mobile`): A Bare React Native application with CI configured for automated APK builds.

## Tech Stack

- **Web App**: React Router, Cloudflare Workers
- **Mobile App**: Bare React Native, React Navigation, HeroUI Native
- **Styling**: Tailwind CSS (Utility-first styling approach for rapid UI development)
- **Language**: TypeScript for safer and more maintainable code
- **Package Manager**: Bun (Fast JavaScript runtime for development and production)
- **Tooling**: Oxlint & Oxfmt for high-performance linting and formatting
- **CI/CD**: GitHub Actions for automated builds, deployments, and releases

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.com/)
- [Android SDK](https://developer.android.com/studio) (for Mobile App)
- [JDK 17 or higher](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (for Mobile App)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tiesen243/qianyu.git
cd qianyu
bun install
```

### Development

#### Web App
To start the web development server:
```bash
cd apps/web
bun run dev
```

#### Mobile App
To start the Metro bundler and run the app on an Android emulator or device:
```bash
cd apps/mobile
bun run start
# In another terminal:
bun run android
```

## Deployment & Workflows

This project uses **GitHub Actions** to automate code quality checks, releases, web deployments, and APK builds.

### CI/CD Pipelines

1. **CI (`ci.yml`)**: Runs on every push and pull request to ensure code quality:
   - Code formatting check (Oxfmt)
   - Linting (Oxlint)
   - Type checking (TypeScript)

2. **Web App Deployment**:
   - Automated deployment to **Cloudflare Workers** on merge/push to the main branch.
   - PR Preview deployments via `pr-preview.yml`.

3. **Mobile App Build (`build-apk.yml`)**:
   - Triggered automatically after a release is created.
   - Builds the Android APK and uploads the artifact to the GitHub Release.

4. **Release (`release.yml`)**: Handles versioning and release management:
   - Generates changelog using Changesets.
   - Creates a GitHub Release.

### Configuring Mobile Keystore for GitHub Actions

If you are setting up the Android build for the first time, you need to configure GitHub Secrets for the APK build:

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

3. Set the following repository secrets:
   - `PAT_TOKEN`: Personal access token with repo permissions
   - `QIANYU_UPLOAD_KEY_ALIAS`: Keystore alias
   - `QIANYU_UPLOAD_STORE_BASE64`: Base64 encoded keystore
   - `QIANYU_UPLOAD_STORE_PASSWORD`: Keystore password

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
