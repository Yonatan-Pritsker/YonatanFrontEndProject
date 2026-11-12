import type { Character } from '../types/character'

type CharacterCardProps = {
  character: Character
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <img src={character.image} alt={character.name} width={150} height={150} />
      <h2>{character.name}</h2>
    </article>
  )
}

export default CharacterCard
