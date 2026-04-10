#!/usr/bin/env node
// rename-app.js
// Usage: node rename-app.js <newName>
// Renames the app from its current name to <newName> across all relevant files.

import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'fs'
import { basename, dirname, join } from 'path'

const newName = process.argv[2]
if (!newName) {
  console.error('Usage: node rename-app.js <newName>')
  process.exit(1)
}

if (!/^[a-z][a-z0-9-]*$/.test(newName)) {
  console.error(
    'Error: newName must be lowercase alphanumeric and hyphens, starting with a letter.'
  )
  process.exit(1)
}

const root = new URL('.', import.meta.url).pathname.replace(/\/$/, '')

// Detect current name from apps/api/package.json
const apiPkg = JSON.parse(
  readFileSync(join(root, 'apps/api/package.json'), 'utf8')
)
const match = apiPkg.name.match(/^@([^/]+)\//)
if (!match) {
  console.error('Could not detect current app name from apps/api/package.json')
  process.exit(1)
}
const oldName = match[1]

if (oldName === newName) {
  console.log(`App name is already '${newName}'. Nothing to do.`)
  process.exit(0)
}

// Title-case helper (first letter uppercase, rest lowercase)
const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const oldTitle = titleCase(oldName)
const newTitle = titleCase(newName)
// Capitalize-all-words (for display names that may be multi-word or single-word)
const oldUpper = oldName.toUpperCase()
const newUpper = newName.toUpperCase()

console.log(`Renaming app from '${oldName}' to '${newName}'...`)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function replaceInFile(filePath, replacer) {
  if (!existsSync(filePath)) return
  const original = readFileSync(filePath, 'utf8')
  const updated = replacer(original)
  if (updated !== original) {
    writeFileSync(filePath, updated, 'utf8')
    console.log(`  updated: ${filePath.replace(root + '/', '')}`)
  }
}

// Replace all occurrences of oldStr with newStr in content
function replaceAll(content, oldStr, newStr) {
  return content.split(oldStr).join(newStr)
}

// Apply multiple replacements in order
function applyReplacements(content, pairs) {
  for (const [from, to] of pairs) {
    content = replaceAll(content, from, to)
  }
  return content
}

// Find all package.json files (excluding node_modules, .git, .bun)
function findFiles(dir, filename) {
  const results = []
  for (const entry of readdirSync(dir)) {
    if (
      entry === 'node_modules' ||
      entry === '.git' ||
      entry === '.bun' ||
      entry.startsWith('.conform')
    )
      continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...findFiles(full, filename))
    } else if (entry === filename) {
      results.push(full)
    }
  }
  return results
}

function findFilesByPattern(dir, predicate) {
  const results = []
  for (const entry of readdirSync(dir)) {
    if (
      entry === 'node_modules' ||
      entry === '.git' ||
      entry === '.bun' ||
      entry.startsWith('.conform')
    )
      continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...findFilesByPattern(full, predicate))
    } else if (predicate(entry)) {
      results.push(full)
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// 1. All package.json files — update `name` field and all @oldName/ references
// ---------------------------------------------------------------------------
const packageJsonFiles = findFiles(root, 'package.json')
for (const file of packageJsonFiles) {
  replaceInFile(file, (content) =>
    applyReplacements(content, [[`@${oldName}/`, `@${newName}/`]])
  )
}

// ---------------------------------------------------------------------------
// 2. All tsconfig.json files — update `extends` and `paths` with @oldName/
// ---------------------------------------------------------------------------
const tsconfigFiles = findFiles(root, 'tsconfig.json')
for (const file of tsconfigFiles) {
  replaceInFile(file, (content) =>
    applyReplacements(content, [[`@${oldName}/`, `@${newName}/`]])
  )
}

// ---------------------------------------------------------------------------
// 3. Makefile
// ---------------------------------------------------------------------------
replaceInFile(join(root, 'Makefile'), (content) =>
  applyReplacements(content, [
    [`@${oldName}/`, `@${newName}/`],
    [oldTitle, newTitle],
  ])
)

// ---------------------------------------------------------------------------
// 4. Mobile — app.json
// ---------------------------------------------------------------------------
replaceInFile(join(root, 'apps/mobile/app.json'), (content) => {
  const json = JSON.parse(content)
  if (json.name === oldName) json.name = newName
  if (json.displayName === oldName) json.displayName = newName
  if (json.displayName === oldTitle) json.displayName = newTitle
  return JSON.stringify(json, null, 2) + '\n'
})

// ---------------------------------------------------------------------------
// 5. Desktop — tauri.conf.json (productName, identifier, window title)
// ---------------------------------------------------------------------------
replaceInFile(
  join(root, 'apps/desktop/src-tauri/tauri.conf.json'),
  (content) => {
    const json = JSON.parse(content)
    if (json.productName === oldTitle || json.productName === oldName)
      json.productName = newTitle
    if (json.identifier === `com.${oldName}.desktop`)
      json.identifier = `com.${newName}.desktop`
    if (json.app?.windows) {
      for (const win of json.app.windows) {
        if (win.title === oldTitle || win.title === oldName)
          win.title = newTitle
      }
    }
    return JSON.stringify(json, null, 2) + '\n'
  }
)

// ---------------------------------------------------------------------------
// 6. Desktop — Cargo.toml
// ---------------------------------------------------------------------------
replaceInFile(join(root, 'apps/desktop/src-tauri/Cargo.toml'), (content) =>
  applyReplacements(content, [
    [`name = "${oldName}_desktop"`, `name = "${newName}_desktop"`],
    [`name = "${oldName}"`, `name = "${newName}"`],
  ])
)

// ---------------------------------------------------------------------------
// 7. Mobile Android — build.gradle (namespace, applicationId)
// ---------------------------------------------------------------------------
replaceInFile(join(root, 'apps/mobile/android/app/build.gradle'), (content) =>
  applyReplacements(content, [
    [`com.${oldName}.mobile`, `com.${newName}.mobile`],
  ])
)

// ---------------------------------------------------------------------------
// 8. Mobile Android — strings.xml (app_name)
// ---------------------------------------------------------------------------
replaceInFile(
  join(root, 'apps/mobile/android/app/src/main/res/values/strings.xml'),
  (content) =>
    applyReplacements(content, [
      [oldTitle, newTitle],
      [oldName, newName],
    ])
)

// ---------------------------------------------------------------------------
// 9. Mobile Android — settings.gradle (rootProject.name)
// ---------------------------------------------------------------------------
replaceInFile(join(root, 'apps/mobile/android/settings.gradle'), (content) =>
  applyReplacements(content, [
    [`rootProject.name = '${oldName}'`, `rootProject.name = '${newName}'`],
  ])
)

// ---------------------------------------------------------------------------
// 10. Mobile Android — Kotlin package files + rename directory
// ---------------------------------------------------------------------------
const androidJavaBase = join(root, 'apps/mobile/android/app/src/main/java')
const oldAndroidPkgDir = join(androidJavaBase, 'com', oldName, 'mobile')
const newAndroidPkgDir = join(androidJavaBase, 'com', newName, 'mobile')

if (existsSync(oldAndroidPkgDir)) {
  // Update content of Kotlin files first
  const ktFiles = findFilesByPattern(oldAndroidPkgDir, (f) => f.endsWith('.kt'))
  for (const file of ktFiles) {
    replaceInFile(file, (content) =>
      applyReplacements(content, [
        [`com.${oldName}.mobile`, `com.${newName}.mobile`],
        [oldName, newName],
      ])
    )
  }
  // Rename parent directory (com/oldName -> com/newName)
  const oldParent = join(androidJavaBase, 'com', oldName)
  const newParent = join(androidJavaBase, 'com', newName)
  if (!existsSync(newParent)) {
    renameSync(oldParent, newParent)
    console.log(
      `  renamed: ${oldParent.replace(root + '/', '')} -> ${newParent.replace(root + '/', '')}`
    )
  }
}

// ---------------------------------------------------------------------------
// 11. Mobile iOS — Info.plist, AppDelegate.swift
// ---------------------------------------------------------------------------
const iosOldDir = join(root, 'apps/mobile/ios', oldName)
const iosNewDir = join(root, 'apps/mobile/ios', newName)
const iosOldXcodeproj = join(root, 'apps/mobile/ios', `${oldName}.xcodeproj`)
const iosNewXcodeproj = join(root, 'apps/mobile/ios', `${newName}.xcodeproj`)

// Update files inside ios/${oldName}/ before renaming
if (existsSync(iosOldDir)) {
  replaceInFile(join(iosOldDir, 'Info.plist'), (content) =>
    applyReplacements(content, [
      [oldTitle, newTitle],
      [oldName, newName],
    ])
  )
  replaceInFile(join(iosOldDir, 'AppDelegate.swift'), (content) =>
    applyReplacements(content, [
      [`withModuleName: "${oldName}"`, `withModuleName: "${newName}"`],
    ])
  )
  // Rename ios/qianyu/ → ios/{newName}/
  renameSync(iosOldDir, iosNewDir)
  console.log(
    `  renamed: ${iosOldDir.replace(root + '/', '')} -> ${iosNewDir.replace(root + '/', '')}`
  )
}

// ---------------------------------------------------------------------------
// 12. Mobile iOS — project.pbxproj (bundle IDs, product name, target name, paths)
// ---------------------------------------------------------------------------
const pbxprojPath = existsSync(iosNewXcodeproj)
  ? join(iosNewXcodeproj, 'project.pbxproj')
  : join(iosOldXcodeproj, 'project.pbxproj')

replaceInFile(pbxprojPath, (content) =>
  applyReplacements(content, [
    [`com.${oldName}.mobile`, `com.${newName}.mobile`],
    [
      `INFOPLIST_KEY_CFBundleDisplayName = "${oldTitle}"`,
      `INFOPLIST_KEY_CFBundleDisplayName = "${newTitle}"`,
    ],
    [
      `INFOPLIST_KEY_CFBundleDisplayName = "${oldName}"`,
      `INFOPLIST_KEY_CFBundleDisplayName = "${newName}"`,
    ],
    [`PRODUCT_NAME = "${oldName}"`, `PRODUCT_NAME = "${newName}"`],
    // file path references: qianyu/Info.plist → newName/Info.plist
    [`path = "${oldName}/`, `path = "${newName}/`],
    [`path = ${oldName}/`, `path = ${newName}/`],
    // target/project name references
    [
      `/* Build configuration list for PBXNativeTarget "${oldName}" */`,
      `/* Build configuration list for PBXNativeTarget "${newName}" */`,
    ],
    [
      `/* Build configuration list for PBXProject "${oldName}" */`,
      `/* Build configuration list for PBXProject "${newName}" */`,
    ],
    [`name = "${oldName}"`, `name = "${newName}"`],
    [`productName = "${oldName}"`, `productName = "${newName}"`],
    // Pods references
    [`Pods-${oldName}`, `Pods-${newName}`],
    [`libPods-${oldName}`, `libPods-${newName}`],
    // .app reference
    [`${oldName}.app`, `${newName}.app`],
  ])
)

// Rename ios/${oldName}.xcodeproj/ → ios/${newName}.xcodeproj/
if (existsSync(iosOldXcodeproj)) {
  renameSync(iosOldXcodeproj, iosNewXcodeproj)
  console.log(
    `  renamed: ${iosOldXcodeproj.replace(root + '/', '')} -> ${iosNewXcodeproj.replace(root + '/', '')}`
  )
}

// ---------------------------------------------------------------------------
// 13. Mobile iOS — Podfile (target name)
// ---------------------------------------------------------------------------
replaceInFile(join(root, 'apps/mobile/ios/Podfile'), (content) =>
  applyReplacements(content, [
    [`target '${oldName}' do`, `target '${newName}' do`],
  ])
)

// ---------------------------------------------------------------------------
// 14. Web — assetlinks.json (Android deep link package name)
// ---------------------------------------------------------------------------
replaceInFile(
  join(root, 'apps/web/public/.well-known/assetlinks.json'),
  (content) =>
    applyReplacements(content, [
      [`com.${oldName}.mobile`, `com.${newName}.mobile`],
    ])
)

// ---------------------------------------------------------------------------
console.log(`\nDone! App renamed from '${oldName}' to '${newName}'.`)
console.log(`Remember to run your package manager install to update lockfiles.`)
