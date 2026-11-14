import CharacterList from '../components/CharacterList'
import LoadMoreButton from '../components/LoadMoreButton'
import SearchBox from '../components/SearchBox'
import SortControl from '../components/SortControl'
import StatusMessage from '../components/StatusMessage'
import TagFilter from '../components/TagFilter'
import type { Character } from '../types/character'
import type { SortOption } from '../types/sort'
import type { Tag } from '../types/tag'
import { sortByLastSeen } from '../utils/episodes'
import { filterByName, filterByTag } from '../utils/filters'

type CharacterListPageProps = {
  characters: Character[]
  selectedTag: Tag | null
  isLoading: boolean
  error: string | null
  hasMore: boolean
  searchText: string
  sortBy: SortOption
  onTagChange: (tag: Tag | null) => void
  onLoadMore: () => void
  onSearchChange: (text: string) => void
  onSortChange: (sortBy: SortOption) => void
}

function CharacterListPage({
  characters,
  selectedTag,
  isLoading,
  error,
  hasMore,
  searchText,
  sortBy,
  onTagChange,
  onLoadMore,
  onSearchChange,
  onSortChange,
}: CharacterListPageProps) {
  // Search and sort only change what's shown, not what's loaded: the API isn't called for them
  const filteredCharacters = filterByName(filterByTag(characters, selectedTag), searchText)
  const visibleCharacters = sortBy === 'last-seen' ? sortByLastSeen(filteredCharacters) : filteredCharacters
  const isSearching = searchText.trim() !== ''
  const showEmptyMessage = !isLoading && !error && visibleCharacters.length === 0

  return (
    <>
      <h1>Rick and Morty characters</h1>
      <TagFilter selectedTag={selectedTag} onTagChange={onTagChange} />
      <SearchBox value={searchText} onChange={onSearchChange} />
      <SortControl sortBy={sortBy} onSortChange={onSortChange} />

      {/* The list stays on screen while "load more" brings the next page */}
      {visibleCharacters.length > 0 && <CharacterList characters={visibleCharacters} />}
      {showEmptyMessage && isSearching && <p>No results for "{searchText.trim()}" in the loaded characters</p>}
      {showEmptyMessage && !isSearching && <p>No characters to show</p>}

      {isLoading && <StatusMessage kind="loading" text="Loading characters..." />}
      {error && <StatusMessage kind="error" text={error} />}
      {hasMore && !isLoading && !error && <LoadMoreButton onClick={onLoadMore} />}
    </>
  )
}

export default CharacterListPage
