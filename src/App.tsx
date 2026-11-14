import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import sampleCharacters from './data/sample-characters.json'
import CharacterDetailsPage from './pages/CharacterDetailsPage'
import CharacterListPage from './pages/CharacterListPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import type { Character } from './types/character'
import './App.css'

// Local data until task 3 switches to the API.
// The JSON import types status/gender as plain string, so it needs the cast.
const characters = sampleCharacters as Character[]

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<CharacterListPage characters={characters} />} />
          <Route path="/characters/:id" element={<CharacterDetailsPage characters={characters} />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
