import { post } from '@qianyu/lib/api/post'

describe('post query keys', () => {
  describe('all.key', () => {
    it('returns the correct key structure with default values', () => {
      const key = post.all.key({})
      expect(key).toEqual(['posts', { limit: 1, skip: 0 }])
    })

    it('returns the correct key structure with custom limit and skip', () => {
      const key = post.all.key({ limit: 10, skip: 5 })
      expect(key).toEqual(['posts', { limit: 10, skip: 5 }])
    })

    it('uses default limit of 1 when not specified', () => {
      const key = post.all.key({ skip: 2 })
      expect(key[1]).toEqual(expect.objectContaining({ limit: 1 }))
    })

    it('uses default skip of 0 when not specified', () => {
      const key = post.all.key({ limit: 5 })
      expect(key[1]).toEqual(expect.objectContaining({ skip: 0 }))
    })
  })

  describe('one.key', () => {
    it('returns the correct key structure', () => {
      const key = post.one.key({ id: 42 })
      expect(key).toEqual(['posts', 42])
    })

    it('returns different keys for different IDs', () => {
      const key1 = post.one.key({ id: 1 })
      const key2 = post.one.key({ id: 2 })
      expect(key1).not.toEqual(key2)
    })
  })

  describe('all.queryOptions', () => {
    it('includes the correct query key', () => {
      const options = post.all.queryOptions({ limit: 5, skip: 0 })
      expect(options.queryKey).toEqual(['posts', { limit: 5, skip: 0 }])
    })

    it('includes a queryFn', () => {
      const options = post.all.queryOptions({ limit: 1 })
      expect(typeof options.queryFn).toBe('function')
    })
  })

  describe('one.queryOptions', () => {
    it('includes the correct query key', () => {
      const options = post.one.queryOptions({ id: 7 })
      expect(options.queryKey).toEqual(['posts', 7])
    })

    it('includes a queryFn', () => {
      const options = post.one.queryOptions({ id: 1 })
      expect(typeof options.queryFn).toBe('function')
    })
  })
})
