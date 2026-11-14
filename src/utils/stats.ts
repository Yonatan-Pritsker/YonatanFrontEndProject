import type { Character, CharacterStatus } from '../types/character'
import type { Tag } from '../types/tag'
import { getTags } from './tags'

// How many characters have each tag. Morty Rick counts once under rick and once under morty,
// so the numbers can add up to more than the number of characters.
export function countByTag(characters: Character[]): Record<Tag, number> {
  const counts: Record<Tag, number> = { rick: 0, morty: 0, summer: 0, beth: 0, jerry: 0, other: 0 }
  for (const character of characters) {
    for (const tag of getTags(character.name)) {
      counts[tag] += 1
    }
  }
  return counts
}

export function countByStatus(characters: Character[]): Record<CharacterStatus, number> {
  const counts: Record<CharacterStatus, number> = { Alive: 0, Dead: 0, unknown: 0 }
  for (const character of characters) {
    counts[character.status] += 1
  }
  return counts
}

// The characters in the most episodes, most first. Same count -> lower id first.
export function mostEpisodes(characters: Character[], limit: number): Character[] {
  return [...characters]
    .sort((a, b) => {
      const difference = b.episode.length - a.episode.length
      if (difference !== 0) {
        return difference
      }
      return a.id - b.id
    })
    .slice(0, limit)
}
