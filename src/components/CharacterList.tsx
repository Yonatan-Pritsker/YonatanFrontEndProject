import type { Character } from '../types/character'
import CharacterCard from './CharacterCard'

type CharacterListProps = {
  characters: Character[]
}

function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}

export default CharacterList
