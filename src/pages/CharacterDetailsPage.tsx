import { useParams } from 'react-router-dom'
import type { Character } from '../types/character'

type CharacterDetailsPageProps = {
  characters: Character[]
}

// For now the character comes from the local list. In task 3 this page fetches it by id.
function CharacterDetailsPage({ characters }: CharacterDetailsPageProps) {
  const { id } = useParams()
  const character = characters.find((c) => c.id === Number(id))

  if (!character) {
    return <p>Character not found</p>
  }

  return (
    <section>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={300} height={300} />
      <ul>
        <li>Status: {character.status}</li>
        <li>Species: {character.species}</li>
        <li>Gender: {character.gender}</li>
        <li>Origin: {character.origin.name}</li>
        <li>Last known location: {character.location.name}</li>
        <li>Episodes: {character.episode.length}</li>
      </ul>
    </section>
  )
}

export default CharacterDetailsPage
