import { describe, expect, it } from 'vitest'
import { getBatches } from './batches'

describe('getBatches', () => {
  it('splits the pages after page 1 into groups of 5, with the rest in the last group', () => {
    const batches = getBatches(2, 42, 5)
    expect(batches[0]).toEqual([2, 3, 4, 5, 6])
    expect(batches.at(-1)).toEqual([42])
    expect(batches).toHaveLength(9)
  })

  it('covers every page exactly once', () => {
    expect(getBatches(2, 42, 5).flat()).toEqual(Array.from({ length: 41 }, (_, index) => index + 2))
  })

  it('makes one group when everything fits in it', () => {
    expect(getBatches(1, 3, 5)).toEqual([[1, 2, 3]])
  })

  it('makes no groups when there are no pages left', () => {
    expect(getBatches(43, 42, 5)).toEqual([])
  })
})
