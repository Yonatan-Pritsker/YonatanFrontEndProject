import { describe, expect, it } from 'vitest'
import { episodeUrls, makeCharacter } from '../test/makeCharacter'
import { getEpisodeNumber, getLastEpisode, sortByLastSeen } from './episodes'

describe('getEpisodeNumber', () => {
  it('takes the number from the end of the URL', () => {
    expect(getEpisodeNumber('https://rickandmortyapi.com/api/episode/51')).toBe(51)
    expect(getEpisodeNumber('https://rickandmortyapi.com/api/episode/3')).toBe(3)
  })
})

describe('getLastEpisode', () => {
  it('is the highest number even if the list is out of order', () => {
    expect(getLastEpisode({ episode: episodeUrls(10, 27, 3) })).toBe(27)
  })

  it('is 0 when there are no episodes', () => {
    expect(getLastEpisode({ episode: [] })).toBe(0)
  })
})

describe('sortByLastSeen', () => {
  const alienGoogah = makeCharacter(13, 'Alien Googah', { episode: episodeUrls(31) })
  const morty = makeCharacter(2, 'Morty Smith', { episode: episodeUrls(1, 2, 51) })
  const rick = makeCharacter(1, 'Rick Sanchez', { episode: episodeUrls(1, 2, 51) })
  const annie = makeCharacter(17, 'Annie', { episode: episodeUrls(3) })

  it('puts the latest last episode first', () => {
    const sorted = sortByLastSeen([annie, alienGoogah, rick])
    expect(sorted.map((character) => character.name)).toEqual(['Rick Sanchez', 'Alien Googah', 'Annie'])
  })

  it('puts the lower id first when the last episode is the same', () => {
    const sorted = sortByLastSeen([morty, rick])
    expect(sorted.map((character) => character.id)).toEqual([1, 2])
  })

  it('does not change the array it gets', () => {
    const original = [annie, morty, rick]
    sortByLastSeen(original)
    expect(original).toEqual([annie, morty, rick])
  })
})
