import { describe, expect, it } from 'vitest'
import { episodeUrls, makeCharacter } from '../test/makeCharacter'
import { countByStatus, countByTag, mostEpisodes } from './stats'

describe('countByTag', () => {
  it('counts Morty Rick under both rick and morty', () => {
    const counts = countByTag([
      makeCharacter(1, 'Rick Sanchez'),
      makeCharacter(2, 'Morty Smith'),
      makeCharacter(231, 'Morty Rick'),
      makeCharacter(6, 'Abadango Cluster Princess'),
    ])
    expect(counts).toEqual({ rick: 2, morty: 2, summer: 0, beth: 0, jerry: 0, other: 1 })
  })

  it('gives 0 for every tag when nothing is loaded', () => {
    expect(countByTag([])).toEqual({ rick: 0, morty: 0, summer: 0, beth: 0, jerry: 0, other: 0 })
  })
})

describe('countByStatus', () => {
  it('counts each status', () => {
    const counts = countByStatus([
      makeCharacter(1, 'Rick Sanchez', { status: 'Alive' }),
      makeCharacter(8, 'Adjudicator Rick', { status: 'Dead' }),
      makeCharacter(9, 'Agency Director', { status: 'Dead' }),
      makeCharacter(6, 'Abadango Cluster Princess', { status: 'unknown' }),
    ])
    expect(counts).toEqual({ Alive: 1, Dead: 2, unknown: 1 })
  })
})

describe('mostEpisodes', () => {
  const rick = makeCharacter(1, 'Rick Sanchez', { episode: episodeUrls(1, 2, 3) })
  const morty = makeCharacter(2, 'Morty Smith', { episode: episodeUrls(1, 2, 3) })
  const jerry = makeCharacter(5, 'Jerry Smith', { episode: episodeUrls(1, 2) })
  const annie = makeCharacter(17, 'Annie', { episode: episodeUrls(3) })

  it('puts the most episodes first and lower id first on a tie', () => {
    const top = mostEpisodes([annie, jerry, morty, rick], 4)
    expect(top.map((character) => character.name)).toEqual(['Rick Sanchez', 'Morty Smith', 'Jerry Smith', 'Annie'])
  })

  it('returns only as many as the limit', () => {
    expect(mostEpisodes([annie, jerry, morty, rick], 2)).toHaveLength(2)
  })
})
