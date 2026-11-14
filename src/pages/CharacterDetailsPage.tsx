import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCharacter } from '../api/characters'
import CloneBadge from '../components/CloneBadge'
import FavoriteButton from '../components/FavoriteButton'
import StatusMessage from '../components/StatusMessage'
import TagBadges from '../components/TagBadges'
import type { Character } from '../types/character'
import { getLastEpisode } from '../utils/episodes'
import { getTags, isClone } from '../utils/tags'

type CharacterDetailsPageProps = {
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

function CharacterDetailsPage({ favoriteIds, onToggleFavorite }: CharacterDetailsPageProps) {
  const { id } = useParams()
  // useParams gives a string. "abc" or "1.5" aren't real ids, and the API answers 500 for them,
  // so those don't get fetched at all
  const characterId = Number(id)
  const isValidId = Number.isInteger(characterId) && characterId > 0

  const [character, setCharacter] = useState<Character | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isValidId) return

    let ignore = false

    fetchCharacter(characterId)
      .then((result) => {
        if (!ignore) setCharacter(result)
      })
      .catch(() => {
        if (!ignore) setError('Could not load this character. Try again later.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [characterId, isValidId])

  if (!isValidId) {
    return <p>Character not found</p>
  }
  if (isLoading) {
    return <StatusMessage kind="loading" text="Loading character..." />
  }
  if (error) {
    return <StatusMessage kind="error" text={error} />
  }
  // fetchCharacter returns null for an id that doesn't exist (404)
  if (!character) {
    return <p>Character not found</p>
  }

  return (
    <section className="character-details">
      <h1>{character.name}</h1>
      <TagBadges tags={getTags(character.name)} />
      {isClone(character) && <CloneBadge />}
      <FavoriteButton
        isFavorite={favoriteIds.includes(character.id)}
        onToggle={() => onToggleFavorite(character.id)}
      />
      <div className="details-body">
        <img src={character.image} alt={character.name} width={300} height={300} />
        <ul>
          <li>Status: {character.status}</li>
          <li>Species: {character.species}</li>
          <li>Gender: {character.gender}</li>
          <li>Origin: {character.origin.name}</li>
          <li>Last known location: {character.location.name}</li>
          <li>Episodes: {character.episode.length}</li>
          <li>Last seen in episode: {getLastEpisode(character)}</li>
        </ul>
      </div>
    </section>
  )
}

export default CharacterDetailsPage
