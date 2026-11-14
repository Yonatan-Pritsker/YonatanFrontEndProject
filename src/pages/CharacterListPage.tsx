import CharacterList from '../components/CharacterList'
import type { Character } from '../types/character'

type CharacterListPageProps = {
  characters: Character[]
}

function CharacterListPage({ characters }: CharacterListPageProps) {
  return (
    <>
      <h1>Rick and Morty characters</h1>
      <CharacterList characters={characters} />
    </>
  )
}

export default CharacterListPage
