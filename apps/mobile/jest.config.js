/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@qianyu/lib/(.*)$': '<rootDir>/../../packages/lib/src/$1',
    '^@qianyu/lib$': '<rootDir>/../../packages/lib/src/index',
  },
  modulePaths: ['<rootDir>/node_modules'],
  transformIgnorePatterns: [
    // Transform React Native ecosystem packages while ignoring other node_modules.
    // The `\.bun/` path segment is also excluded from the ignore pattern to support
    // bun's symlink-based package layout where packages live in node_modules/.bun/<pkg>/.
    'node_modules/(?!(\\.bun\\/|((jest-)?react-native|@react-native(-community)?|@react-navigation|@tanstack\\/react-query|heroui-native|lucide-react-native|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|@gorhom|uniwind)/))',
  ],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
}
