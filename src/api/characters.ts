import type { Character, CharactersPage } from '../types/character'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

// One page of 20 characters. With a name, only characters whose name contains it.
export async function fetchCharacters(page: number, name?: string): Promise<CharactersPage> {
  const params = new URLSearchParams({ page: String(page) })
  if (name) {
    params.set('name', name)
  }

  const response = await fetch(`${BASE_URL}?${params}`)
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
