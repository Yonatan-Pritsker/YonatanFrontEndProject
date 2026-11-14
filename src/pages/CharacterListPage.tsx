import CharacterList from '../components/CharacterList'
import StatusMessage from '../components/StatusMessage'
import type { Character } from '../types/character'

type CharacterListPageProps = {
  characters: Character[]
  isLoading: boolean
  error: string | null
}

function CharacterListPage({ characters, isLoading, error }: CharacterListPageProps) {
  return (
    <>
      <h1>Rick and Morty characters</h1>
      {isLoading && <StatusMessage kind="loading" text="Loading characters..." />}
      {error && <StatusMessage kind="error" text={error} />}
      {!isLoading && !error && <CharacterList characters={characters} />}
    </>
  )
}

export default CharacterListPage
