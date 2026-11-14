import { describe, expect, it } from 'vitest'
import type { Character } from '../types/character'
import { filterByTag } from './filters'

// filterByTag only looks at the name, so the other fields can be anything
function makeCharacter(id: number, name: string): Character {
  return {
    id,
    name,
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
  }
}

const characters = [
  makeCharacter(1, 'Rick Sanchez'),
  makeCharacter(2, 'Morty Smith'),
  makeCharacter(6, 'Abadango Cluster Princess'),
  makeCharacter(231, 'Morty Rick'),
  makeCharacter(11, 'Albert Einstein'),
]

const names = (list: Character[]) => list.map((character) => character.name)

describe('filterByTag', () => {
  it('keeps everyone when no tag is picked', () => {
    expect(filterByTag(characters, null)).toEqual(characters)
  })

  it('keeps only characters without any of the five for "other"', () => {
    expect(names(filterByTag(characters, 'other'))).toEqual(['Abadango Cluster Princess', 'Albert Einstein'])
  })

  it('keeps Morty Rick under both rick and morty', () => {
    expect(names(filterByTag(characters, 'rick'))).toEqual(['Rick Sanchez', 'Morty Rick'])
    expect(names(filterByTag(characters, 'morty'))).toEqual(['Morty Smith', 'Morty Rick'])
  })
})
