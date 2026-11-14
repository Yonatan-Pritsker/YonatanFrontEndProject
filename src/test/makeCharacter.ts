import type { Character } from '../types/character'

// Only for tests: a full Character where each test fills in just the fields it cares about
export function makeCharacter(id: number, name: string, overrides: Partial<Character> = {}): Character {
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
    ...overrides,
  }
}

// The episode URLs look like this in the API
export function episodeUrls(...numbers: number[]): string[] {
  return numbers.map((number) => `https://rickandmortyapi.com/api/episode/${number}`)
}
