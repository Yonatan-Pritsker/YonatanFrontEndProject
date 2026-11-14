const STORAGE_KEY = 'favoriteIds'

// Adds the id if it's not there, removes it if it is. Returns a new array, the old one stays as it was.
export function toggleFavorite(ids: number[], id: number): number[] {
  if (ids.includes(id)) {
    return ids.filter((favoriteId) => favoriteId !== id)
  }
  return [...ids, id]
}

// What's saved in localStorage is a string like "[1,2,3]". Anyone can edit it in DevTools,
// so anything that isn't a list of whole numbers is thrown away instead of crashing the app.
export function parseFavorites(saved: string | null): number[] {
  if (saved === null) {
    return []
  }
  try {
    const value: unknown = JSON.parse(saved)
    if (!Array.isArray(value)) {
      return []
    }
    return value.filter((item) => Number.isInteger(item))
  } catch {
    return []
  }
}

export function loadFavorites(): number[] {
  return parseFavorites(localStorage.getItem(STORAGE_KEY))
}

export function saveFavorites(ids: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}
