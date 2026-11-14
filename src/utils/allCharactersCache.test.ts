import { describe, expect, it } from 'vitest'
import { parseCachedCharacters } from './allCharactersCache'

describe('parseCachedCharacters', () => {
  it('is null when nothing was saved in this tab', () => {
    expect(parseCachedCharacters(null)).toBeNull()
  })

  it('reads a saved list of characters', () => {
    const saved = JSON.stringify([{ id: 1, name: 'Rick Sanchez' }])
    expect(parseCachedCharacters(saved)).toEqual([{ id: 1, name: 'Rick Sanchez' }])
  })

  it('is null for text that is not JSON or not a list', () => {
    expect(parseCachedCharacters('not json')).toBeNull()
    expect(parseCachedCharacters('{"id":1}')).toBeNull()
  })

  it('is null for an empty list, so the page loads instead of showing 0 characters', () => {
    expect(parseCachedCharacters('[]')).toBeNull()
  })
})
