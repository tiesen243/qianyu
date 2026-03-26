# Qianyu

<p align="center">
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/release.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/release.yml/badge.svg" alt="Release">
  </a>
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/ci.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/ci.yml/badge.svg" alt="Release">
  </a>
  <a href="https://github.com/tiesen243/qianyu/actions/workflows/build-apk.yml">
    <img src="https://github.com/tiesen243/qianyu/actions/workflows/build-apk.yml/badge.svg" alt="Build APK">
  </a>
    <a href="https://github.com/tiesen243/qianyu/releases">
    <img src="https://img.shields.io/github/package-json/v/tiesen243/qianyu" alt="Version Web">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/tiesen243/qianyu" alt="License">
  </a>
</p>

## Overview

Qianyu is a minimal and modern React Native starter template designed to provide a clean, scalable foundation for mobile applications.

It leverages a curated set of tools to improve developer experience, maintainability, and performance.

## Tech Stack

- **TypeScript**: Provides static typing for safer and more maintainable code
- **React Navigation**: Flexible navigation library
- **HeroUI Native**: Modern UI components powered by Tailwind (via Uniwind)
- **Tailwind CSS**: Utility-first styling approach for rapid UI development
- **Bun**: Fast JavaScript runtime for development and production
- **Oxlint & Oxfmt**: High-performance linting and formatting tools
- **GitHub Actions**: CI/CD for automated builds and releases

## Features

- Clean and minimal project structure
- Pre-configured essentials: Stack & Bottom Tab navigation, splash screen, app icon, and more. You can easily change the app icon and splash screen by replacing the files in `android/app/src/main/res/**/*.png`.
- Tailwind-based UI system
- Optimized developer tooling (linting, formatting, runtime)
- Automated APK build and release pipeline

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.com/)
- [Android SDK](https://developer.android.com/studio)
- [JDK 17 or higher](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tiesen243/qianyu.git
cd qianyu
bun install
```

### Development

To start the Metro bundler:

```bash
bun run start
```

To run the app on an Android emulator or device:

```bash
bun run android
```

## Deployment

Follow these steps to build the APK for production via GitHub Actions:

### 1. Generate Keystore

Generate a signing key for your application:

```bash
keytool -genkeypair -v -storetype PKCS12 \
-keystore my-release-key.keystore \
-alias my-key-alias \
-keyalg RSA -keysize 2048 -validity 10000
```

### 2. Encode Keystore

Encode the keystore to base64 so it can be stored as a GitHub Secret:

```bash
base64 my-release-key.keystore > my-release-key.keystore.base64
# Alternatively, copy directly to clipboard:
# base64 my-release-key.keystore | wl-copy # or pbcopy on macOS

# on Windows, use:
certutil -encode my-release-key.keystore my-release-key.keystore.base64
```

### 3. Configure GitHub Secrets

Set the following Actions secrets in your GitHub repository:

- **`PAT_TOKEN`**: A personal access token with `repo` and `workflow` permissions.
- **`QIANYU_UPLOAD_KEY_ALIAS`**: The alias of the key used for signing the APK (e.g., `my-key-alias`).
- **`QIANYU_UPLOAD_STORE_BASE64`**: The base64-encoded keystore file content.
- **`QIANYU_UPLOAD_STORE_PASSWORD`**: The password for the keystore.

### 4. Trigger the Release Workflow

Generate a changelog and push changes:

```bash
bun changeset

git add --all
git commit -m "chore: update changelog"
git push
```

- Merge the Pull Request created by Changesets
- The workflow will automatically build the APK
- The APK will be available in the Releases section

## CI / Workflows

This project uses **GitHub Actions** to automate code quality checks, releases, and APK builds.

### Overview

1. **CI (`ci.yml`)**: Runs on every push and pull request to ensure code quality:
   - Code formatting check (Oxfmt)
   - Linting (Oxlint)
   - Type checking (TypeScript)

2. **Release (`release.yml`)**: Handles versioning and release management:
   - Generates changelog using Changesets
   - Creates a GitHub Release

3. **Build APK (`build-apk.yml`)**: Triggered automatically after a release is created:
   - Builds the Android APK
   - Uploads the artifact to the GitHub Release

### Pipelines

```text
Push / PR
   ↓
CI (lint + format + typecheck)
   ↓
Merge to main
   ↓
Release (generate changelog + create release)
   ↓
Build APK (attach APK to release)
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
