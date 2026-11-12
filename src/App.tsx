import CharacterList from './components/CharacterList'
import sampleCharacters from './data/sample-characters.json'
import type { Character } from './types/character'

// Local data until task 3 switches to the API.
// The JSON import types status/gender as plain string, so it needs the cast.
const characters = sampleCharacters as Character[]

function App() {
  return (
    <main>
      <h1>Rick and Morty characters</h1>
      <CharacterList characters={characters} />
    </main>
  )
}

export default App
