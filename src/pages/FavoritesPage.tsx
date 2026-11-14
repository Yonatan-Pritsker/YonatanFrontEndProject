import { useEffect, useState } from 'react'
import { fetchCharactersByIds } from '../api/characters'
import CharacterList from '../components/CharacterList'
import StatusMessage from '../components/StatusMessage'
import type { Character } from '../types/character'

type FavoritesPageProps = {
  favoriteIds: number[]
}

// Only the ids are saved, so the characters themselves come from the API every time
function FavoritesPage({ favoriteIds }: FavoritesPageProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (favoriteIds.length === 0) return

    let ignore = false

    fetchCharactersByIds(favoriteIds)
      .then((result) => {
        if (!ignore) setCharacters(result)
      })
      .catch(() => {
        if (!ignore) setError('Could not load your favorites. Try again later.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [favoriteIds])

  let content
  if (favoriteIds.length === 0) {
    content = <p>No favorites yet. Open a character and click "Add to favorites".</p>
  } else if (isLoading) {
    content = <StatusMessage kind="loading" text="Loading favorites..." />
  } else if (error) {
    content = <StatusMessage kind="error" text={error} />
  } else {
    content = <CharacterList characters={characters} />
  }

  return (
    <>
      <h1>Favorites</h1>
      {content}
    </>
  )
}

export default FavoritesPage
