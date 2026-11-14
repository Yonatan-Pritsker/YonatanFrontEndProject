import { describe, expect, it } from 'vitest'
import { makeCharacter } from '../test/makeCharacter'
import type { CharactersPage } from '../types/character'
import { EMPTY_PROGRESS, fetchAllCharacters, type LoadProgress } from './allCharacters'

// A fake API with 4 pages of 2 characters (ids 1-8). It remembers which pages were asked for,
// and can fail on one page to act like a 429.
function makeFakeApi(failOnPage?: number) {
  const requested: number[] = []
  async function fetchPage(page: number): Promise<CharactersPage> {
    requested.push(page)
    if (page === failOnPage) {
      throw new Error('Request failed with status 429')
    }
    const firstId = (page - 1) * 2 + 1
    return {
      info: { count: 8, pages: 4, next: page < 4 ? 'next' : null, prev: null },
      results: [makeCharacter(firstId, `Character ${firstId}`), makeCharacter(firstId + 1, `Character ${firstId + 1}`)],
    }
  }
  return { fetchPage, requested }
}

const noWait = async () => {}

describe('fetchAllCharacters', () => {
  it('loads page 1 alone, then the rest in batches, and returns everyone in order', async () => {
    const api = makeFakeApi()
    const result = await fetchAllCharacters(EMPTY_PROGRESS, {
      onProgress: () => {},
      shouldStop: () => false,
      fetchPage: api.fetchPage,
      wait: noWait,
      batchSize: 2,
    })
    expect(result?.map((character) => character.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(api.requested).toEqual([1, 2, 3, 4])
  })

  it('reports progress after every batch', async () => {
    const api = makeFakeApi()
    const loadedCounts: number[] = []
    await fetchAllCharacters(EMPTY_PROGRESS, {
      onProgress: (progress) => loadedCounts.push(progress.characters.length),
      shouldStop: () => false,
      fetchPage: api.fetchPage,
      wait: noWait,
      batchSize: 2,
    })
    // page 1 -> 2, pages 2-3 -> 6, page 4 -> 8
    expect(loadedCounts).toEqual([2, 6, 8])
  })

  it('fails when a page fails, and the last progress keeps what loaded before it', async () => {
    const api = makeFakeApi(3)
    let lastProgress: LoadProgress = EMPTY_PROGRESS
    await expect(
      fetchAllCharacters(EMPTY_PROGRESS, {
        onProgress: (progress) => (lastProgress = progress),
        shouldStop: () => false,
        fetchPage: api.fetchPage,
        wait: noWait,
        batchSize: 2,
      }),
    ).rejects.toThrow('429')
    // Pages 2 and 3 were one batch, so only page 1 counts as loaded
    expect(lastProgress.characters).toHaveLength(2)
    expect(lastProgress.nextPage).toBe(2)
  })

  it('continues from where it stopped instead of loading page 1 again (Try again)', async () => {
    const api = makeFakeApi()
    const afterPage1: LoadProgress = {
      characters: [makeCharacter(1, 'Character 1'), makeCharacter(2, 'Character 2')],
      nextPage: 2,
      totalPages: 4,
      totalCount: 8,
    }
    const result = await fetchAllCharacters(afterPage1, {
      onProgress: () => {},
      shouldStop: () => false,
      fetchPage: api.fetchPage,
      wait: noWait,
      batchSize: 2,
    })
    expect(api.requested).toEqual([2, 3, 4])
    expect(result).toHaveLength(8)
  })

  it('stops without fetching anything when it is stopped right away (leaving the page)', async () => {
    const api = makeFakeApi()
    const result = await fetchAllCharacters(EMPTY_PROGRESS, {
      onProgress: () => {},
      shouldStop: () => true,
      fetchPage: api.fetchPage,
      wait: noWait,
    })
    expect(result).toBeNull()
    expect(api.requested).toEqual([])
  })
})
