import type { Character, CharactersPage } from '../types/character'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

export async function fetchCharacters(page: number): Promise<CharactersPage> {
  const response = await fetch(`${BASE_URL}?page=${page}`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

// Returns null when the id doesn't exist (the API answers 404)
export async function fetchCharacter(id: number): Promise<Character | null> {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}
