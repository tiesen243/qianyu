import type { ElysiaConfig } from 'elysia'

import { Elysia } from 'elysia'

import { name as pkgName } from '@/../package.json' with { type: 'json' }

export const createElysia = <TPrefix extends string = ''>({
  name,
  ...opts
}: ElysiaConfig<TPrefix>) => new Elysia({ name: `${pkgName}.${name}`, ...opts })
