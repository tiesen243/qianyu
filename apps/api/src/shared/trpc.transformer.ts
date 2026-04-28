// oxlint-disable typescript/no-explicit-any

import type { TRPCDataTransformer } from '@trpc/server'

type Metadata = Record<
  string,
  'Date' | 'Number' | 'BigInt' | 'Boolean' | 'Undefined'
>

export const transformer = {
  serialize: (obj) => {
    const meta: Metadata = {}

    const recurse = (value: any, path: string): any => {
      if (value instanceof Date) {
        meta[path] = 'Date'
        return value.getTime()
      } else if (typeof value === 'number') {
        meta[path] = 'Number'
        return value
      } else if (typeof value === 'bigint') {
        meta[path] = 'BigInt'
        return value.toString()
      } else if (typeof value === 'boolean') {
        meta[path] = 'Boolean'
        return value
      } else if (value === undefined) {
        meta[path] = 'Undefined'
        return null
      }

      if (Array.isArray(value))
        return value.map((v, i) => recurse(v, path ? `${path}.${i}` : `${i}`))

      if (value !== null && typeof value === 'object') {
        const result: any = {}
        for (const key in value) {
          if (Object.hasOwn(value, key))
            result[key] = recurse(value[key], path ? `${path}.${key}` : key)
        }
        return result
      }

      return value
    }

    return { data: recurse(obj, ''), meta }
  },

  deserialize: (obj) => {
    if (!obj || typeof obj !== 'object' || !obj.meta) return obj

    const { data, meta } = obj

    // oxlint-disable-next-line unicorn/consistent-function-scoping
    const setDeep = (object: any, path: string, value: any) => {
      const keys = path.split('.') ?? []
      let current = object

      for (let i = 0; i < keys.length - 1; i += 1)
        current = current[keys.at(i) ?? 0]
      current[keys.at(-1) ?? 0] = value
    }

    for (const [path, type] of Object.entries(meta as Metadata)) {
      let rawValue: any = data
      for (const key of path.split('.'))
        rawValue = rawValue ? rawValue[key] : undefined

      if (type === 'Date' && rawValue !== undefined)
        setDeep(data, path, new Date(rawValue))
      else if (type === 'Number' && rawValue !== undefined)
        setDeep(data, path, Number(rawValue))
      else if (type === 'BigInt' && rawValue !== undefined)
        setDeep(data, path, BigInt(rawValue))
      else if (type === 'Boolean' && rawValue !== undefined)
        setDeep(data, path, Boolean(rawValue))
      else if (type === 'Undefined') setDeep(data, path, undefined)
    }

    return data
  },
} satisfies TRPCDataTransformer
