import type { ElysiaConfig } from 'elysia'

import { env } from 'cloudflare:workers'
import { Elysia } from 'elysia'

import { runtime } from '@/runtime'

export const createElysia = <TPrefix extends string = ''>({
  name,
  ...opts
}: ElysiaConfig<TPrefix>) =>
  new Elysia({ name: `${env.APP_NAME}.${name}`, ...opts }).use(runtime)
