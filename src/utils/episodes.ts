import type { Character } from '../types/character'

// "https://rickandmortyapi.com/api/episode/51" -> 51
export function getEpisodeNumber(url: string): number {
  return Number(url.split('/').pop())
}

// The highest episode number, not just the last URL in the list, so it doesn't
// depend on the API keeping the list in order. 0 if the list is empty.
export function getLastEpisode(character: Pick<Character, 'episode'>): number {
  if (character.episode.length === 0) {
    return 0
  }
  return Math.max(...character.episode.map(getEpisodeNumber))
}

// Latest last-seen first. Same last episode -> lower id first, which is the API's own order.
// sort() changes the array it's called on, so it sorts a copy and leaves the props alone.
export function sortByLastSeen(characters: Character[]): Character[] {
  return [...characters].sort((a, b) => {
    const difference = getLastEpisode(b) - getLastEpisode(a)
    if (difference !== 0) {
      return difference
    }
    return a.id - b.id
  })
}
