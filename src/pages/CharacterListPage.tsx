import CharacterList from '../components/CharacterList'
import LoadMoreButton from '../components/LoadMoreButton'
import StatusMessage from '../components/StatusMessage'
import TagFilter from '../components/TagFilter'
import type { Character } from '../types/character'
import type { Tag } from '../types/tag'
import { filterByTag } from '../utils/filters'

type CharacterListPageProps = {
  characters: Character[]
  selectedTag: Tag | null
  isLoading: boolean
  error: string | null
  hasMore: boolean
  onTagChange: (tag: Tag | null) => void
  onLoadMore: () => void
}

function CharacterListPage({
  characters,
  selectedTag,
  isLoading,
  error,
  hasMore,
  onTagChange,
  onLoadMore,
}: CharacterListPageProps) {
  const visibleCharacters = filterByTag(characters, selectedTag)

  return (
    <>
      <h1>Rick and Morty characters</h1>
      <TagFilter selectedTag={selectedTag} onTagChange={onTagChange} />

      {/* The list stays on screen while "load more" brings the next page */}
      {visibleCharacters.length > 0 && <CharacterList characters={visibleCharacters} />}
      {!isLoading && !error && visibleCharacters.length === 0 && <p>No characters to show</p>}

      {isLoading && <StatusMessage kind="loading" text="Loading characters..." />}
      {error && <StatusMessage kind="error" text={error} />}
      {hasMore && !isLoading && !error && <LoadMoreButton onClick={onLoadMore} />}
    </>
  )
}

export default CharacterListPage
