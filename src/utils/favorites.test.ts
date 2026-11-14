import { describe, expect, it } from 'vitest'
import { parseFavorites, toggleFavorite } from './favorites'

describe('toggleFavorite', () => {
  it('adds an id that is not a favorite yet', () => {
    expect(toggleFavorite([1, 2], 5)).toEqual([1, 2, 5])
  })

  it('removes an id that is already a favorite', () => {
    expect(toggleFavorite([1, 2, 5], 2)).toEqual([1, 5])
  })

  it('does not change the array it gets', () => {
    const ids = [1, 2]
    toggleFavorite(ids, 5)
    expect(ids).toEqual([1, 2])
  })
})

describe('parseFavorites', () => {
  it('is empty when nothing was saved yet', () => {
    expect(parseFavorites(null)).toEqual([])
  })

  it('reads a saved list', () => {
    expect(parseFavorites('[1,2,3]')).toEqual([1, 2, 3])
  })

  it('is empty when the saved text is not JSON or not a list', () => {
    expect(parseFavorites('not json')).toEqual([])
    expect(parseFavorites('{"id":1}')).toEqual([])
  })

  it('keeps only whole numbers', () => {
    expect(parseFavorites('[1,"x",2.5,null,3]')).toEqual([1, 3])
  })
})
