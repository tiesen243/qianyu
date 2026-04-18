// oxlint-disable no-bitwise
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

const toBase36Fixed = (num: bigint, length: number) => {
  let out = ''
  const base = 36n

  while (num > 0n) {
    const r = num % base
    out = alphabet[Number(r)] + out
    // oxlint-disable-next-line no-param-reassign
    num /= base
  }

  return out.padStart(length, '0').slice(0, length)
}

// counter per process
let counter = 0

const getRandom64 = () => {
  const buf = new Uint32Array(2)
  crypto.getRandomValues(buf)
  return (BigInt(buf[0] ?? 0) << 32n) | BigInt(buf[1] ?? 0)
}

// fingerprint nhẹ (browser/server-safe)
const fingerprint = (() => {
  const nav = typeof navigator === 'undefined' ? '' : navigator.userAgent
  const mem =
    typeof performance === 'undefined' ? Math.random() : performance.now()
  let h = 0n

  for (let i = 0; i < nav.length; i += 1) {
    h ^= BigInt(nav.codePointAt(i) ?? 0)
    h = (h << 5n) - h
  }

  h ^= BigInt(Math.floor(mem * 1e9))

  // oxlint-disable-next-line unicorn/numeric-separators-style, unicorn/number-literal-case
  return h & 0xffffffffn
})()

export function createId() {
  const time = BigInt(Date.now())
  const rand = getRandom64()

  // oxlint-disable-next-line unicorn/numeric-separators-style, unicorn/number-literal-case
  counter = (counter + 1) & 0xffffff

  let id = (time << 48n) ^ (rand << 16n) ^ BigInt(counter) ^ fingerprint

  id ^= id >> 23n
  // oxlint-disable-next-line unicorn/numeric-separators-style, unicorn/number-literal-case
  id *= 0x2127599bf4325c37n
  id &= (1n << 128n) - 1n

  // encode base36 fixed 24 chars
  return toBase36Fixed(id, 24)
}
