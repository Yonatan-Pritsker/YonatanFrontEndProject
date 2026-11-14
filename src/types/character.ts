export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

// origin and location come from the API as { name, url }
export type Place = {
  name: string
  url: string
}

export type Character = {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: Place
  location: Place
  image: string
  episode: string[]
}

// What GET /character returns: one page of up to 20 characters
export type CharactersPage = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}
