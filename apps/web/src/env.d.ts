// This file infers types for the cloudflare:workers environment from your Alchemy Worker.
// @see https://alchemy.run/concepts/bindings/#type-safe-bindings

// oxlint-disable-next-line import/no-relative-parent-imports
import type { worker } from '../alchemy.run.ts'

export type CloudflareEnv = typeof worker.Env

declare global {
  type Env = CloudflareEnv
}

declare module 'cloudflare:workers' {
  namespace Cloudflare {
    // oxlint-disable-next-line typescript/no-empty-interface, typescript/no-empty-object-type
    export interface Env extends CloudflareEnv {}
  }
}
