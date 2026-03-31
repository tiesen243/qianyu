import { createApi } from '@qianyu/lib/api'
import { Config } from 'react-native-config'

export const api = createApi(Config.RN_API_URL ?? 'http://localhost:1337')
