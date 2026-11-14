import { describe, expect, it } from 'vitest'
import { makeCharacter } from '../test/makeCharacter'
import type { Character } from '../types/character'
import { filterByName, filterByTag } from './filters'

// Both filters only look at the name, so the other fields can be anything

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

describe('filterByName', () => {
  it('keeps everyone when the search is empty or only spaces', () => {
    expect(filterByName(characters, '')).toEqual(characters)
    expect(filterByName(characters, '   ')).toEqual(characters)
  })

  it('finds the text anywhere in the name, ignoring case', () => {
    expect(names(filterByName(characters, 'SMITH'))).toEqual(['Morty Smith'])
    expect(names(filterByName(characters, 'morty'))).toEqual(['Morty Smith', 'Morty Rick'])
  })

  it('ignores spaces around the text', () => {
    expect(names(filterByName(characters, '  einstein '))).toEqual(['Albert Einstein'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterByName(characters, 'zzz')).toEqual([])
  })
})
