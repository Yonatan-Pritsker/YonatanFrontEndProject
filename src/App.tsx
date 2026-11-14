import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { fetchCharacters } from './api/characters'
import NavBar from './components/NavBar'
import CharacterDetailsPage from './pages/CharacterDetailsPage'
import CharacterListPage from './pages/CharacterListPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import type { Character } from './types/character'
import type { SortOption } from './types/sort'
import type { Tag } from './types/tag'
import './App.css'

function App() {
  // The loaded characters live here because later the stats page needs them too
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Here and not in the list page, so the search is still there after visiting a character
  const [searchText, setSearchText] = useState('')
  // Same reason as the search: it stays after visiting a character
  const [sortBy, setSortBy] = useState<SortOption>('default')

  // Runs on start, when the tag changes, and when "load more" moves to the next page
  useEffect(() => {
    // If the effect is cleaned up before the answer arrives (StrictMode in dev, or the tag changed
    // while a page was still loading), ignore that answer so it doesn't mix into the new list
    let ignore = false

    // "other" can't be asked from the API, so it loads everyone and the list page filters
    const name = selectedTag === null || selectedTag === 'other' ? undefined : selectedTag

    fetchCharacters(page, name)
      .then((result) => {
        if (ignore) return
        // Page 1 replaces the list, later pages are added to the end
        setCharacters((previous) => (page === 1 ? result.results : [...previous, ...result.results]))
        setHasMore(result.info.next !== null)
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
  }, [selectedTag, page])

  // The reset happens here and not inside the effect: the effect only fetches
  function handleTagChange(tag: Tag | null) {
    if (tag === selectedTag) return
    setSelectedTag(tag)
    setPage(1)
    setCharacters([])
    setHasMore(false)
    setError(null)
    setIsLoading(true)
  }

  function handleLoadMore() {
    setPage((previous) => previous + 1)
    setIsLoading(true)
  }

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <CharacterListPage
                characters={characters}
                selectedTag={selectedTag}
                isLoading={isLoading}
                error={error}
                hasMore={hasMore}
                searchText={searchText}
                sortBy={sortBy}
                onTagChange={handleTagChange}
                onLoadMore={handleLoadMore}
                onSearchChange={setSearchText}
                onSortChange={setSortBy}
              />
            }
          />
          <Route path="/characters/:id" element={<CharacterDetailsPage />} />
          <Route
            path="/stats"
            element={
              <StatsPage characters={characters} selectedTag={selectedTag} isLoading={isLoading} error={error} />
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
