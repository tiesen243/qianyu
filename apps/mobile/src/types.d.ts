declare module 'react-native-config' {
  export interface NativeConfig {
    PUBLIC_API_URL?: string

    RN_SCHEME?: string
    RN_PREFIX?: string
  }

  export const Config: NativeConfig
  export default Config
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}
