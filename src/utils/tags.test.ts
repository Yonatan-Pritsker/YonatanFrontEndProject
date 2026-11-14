import { describe, expect, it } from 'vitest'
import { getTags, isClone } from './tags'

// All names and types below are real characters from the API

describe('getTags', () => {
  it('gives Rick Sanchez the rick tag', () => {
    expect(getTags('Rick Sanchez')).toEqual(['rick'])
  })

  it('gives Morty Rick both tags', () => {
    expect(getTags('Morty Rick')).toEqual(['rick', 'morty'])
  })

  it('ignores case, so Big Fat rick is a Rick', () => {
    expect(getTags('Big Fat rick')).toEqual(['rick'])
  })

  it('matches inside a word, so Ricktiminus Sancheziminius is a Rick', () => {
    expect(getTags('Ricktiminus Sancheziminius')).toEqual(['rick'])
  })

  it('gives "other" to a name with none of the five', () => {
    expect(getTags('Abadango Cluster Princess')).toEqual(['other'])
  })

  // Known limitation: he works at the Jerryboree, he isn't a Jerry.
  // The PRD says to keep it like this instead of keeping a list of ids.
  it('tags Jerryboree Keeper as jerry (known limitation)', () => {
    expect(getTags('Jerryboree Keeper')).toEqual(['jerry'])
  })
})

describe('isClone', () => {
  it('is true for the types Clone, Mytholog and Goddess', () => {
    expect(isClone({ name: 'Tiny Rick', type: 'Clone' })).toBe(true)
    expect(isClone({ name: 'Ideal Jerry', type: 'Mytholog' })).toBe(true)
    expect(isClone({ name: 'Goddess Beth', type: 'Goddess' })).toBe(true)
  })

  it('is true when the name says clone, even if the type is something else', () => {
    expect(isClone({ name: 'Wasp Rick’s Clone', type: 'Wasp' })).toBe(true)
  })

  it('is false for copies that are not clones, like Decoy, Soulless Puppet and Memory', () => {
    expect(isClone({ name: 'Scarecrow Rick', type: 'Decoy' })).toBe(false)
    expect(isClone({ name: 'Rick’s Disguise', type: 'Soulless Puppet' })).toBe(false)
    expect(isClone({ name: 'Memory Rick', type: 'Memory' })).toBe(false)
  })

  it('is false for a character with no type', () => {
    expect(isClone({ name: 'Rick Sanchez', type: '' })).toBe(false)
  })
})
