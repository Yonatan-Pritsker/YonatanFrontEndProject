import type { Character } from '../types/character'

const CACHE_KEY = 'allCharacters'

// sessionStorage keeps it until the tab is closed, so coming back to the stats page doesn't load
// everything again. Only a full load is saved (see StatsPage), so a list here means "all of them".
// Anything that isn't a non-empty list counts as "nothing saved" and the page just loads again.
export function parseCachedCharacters(saved: string | null): Character[] | null {
  if (saved === null) {
    return null
  }
  try {
    const value: unknown = JSON.parse(saved)
    if (!Array.isArray(value) || value.length === 0) {
      return null
    }
    return value
  } catch {
    return null
  }
}

export function loadCachedCharacters(): Character[] | null {
  return parseCachedCharacters(sessionStorage.getItem(CACHE_KEY))
}

// If the browser refuses (storage full), the stats still work, they just load again next time
export function saveCachedCharacters(characters: Character[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(characters))
  } catch {
    // nothing to do
  }
}
