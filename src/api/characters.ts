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

// Several characters in one request: /character/1,2,3.
// With one id the API answers with an object and not a list, so it's put in a list here.
// Ids that don't exist are just left out. Only a single missing id gets a 404, so that's an empty list too.
export async function fetchCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) {
    return []
  }
  const response = await fetch(`${BASE_URL}/${ids.join(',')}`)
  if (response.status === 404) {
    return []
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  const data: Character | Character[] = await response.json()
  return Array.isArray(data) ? data : [data]
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
