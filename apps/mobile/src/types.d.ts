declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string
  }

  export const Config: NativeConfig
  export default Config
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}
