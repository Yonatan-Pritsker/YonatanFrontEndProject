import { Link } from 'react-router-dom'
import type { Character } from '../types/character'

type CharacterCardProps = {
  character: Character
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <Link to={`/characters/${character.id}`}>
        <img src={character.image} alt={character.name} width={150} height={150} />
        <h2>{character.name}</h2>
      </Link>
    </article>
  )
}

export default CharacterCard
