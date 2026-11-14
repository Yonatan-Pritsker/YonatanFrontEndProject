import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { fetchCharacters } from './api/characters'
import NavBar from './components/NavBar'
import CharacterDetailsPage from './pages/CharacterDetailsPage'
import CharacterListPage from './pages/CharacterListPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import type { Character } from './types/character'
import './App.css'

function App() {
  // The loaded characters live here because later the stats page needs them too
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If the effect is cleaned up before the answer arrives (StrictMode runs it twice in dev),
    // ignore that answer so it doesn't overwrite the newer one
    let ignore = false

    fetchCharacters(1)
      .then((page) => {
        if (!ignore) setCharacters(page.results)
      })
      .catch(() => {
        if (!ignore) setError('Could not load characters. Try again later.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<CharacterListPage characters={characters} isLoading={isLoading} error={error} />}
          />
          <Route path="/characters/:id" element={<CharacterDetailsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
