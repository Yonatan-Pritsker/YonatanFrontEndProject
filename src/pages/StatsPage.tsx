import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import type { Character } from '../types/character'
import type { Tag } from '../types/tag'
import { filterByTag } from '../utils/filters'
import { countByStatus, countByTag, mostEpisodes } from '../utils/stats'
import { ALL_TAGS, TAG_LABELS } from '../utils/tags'

type StatsPageProps = {
  characters: Character[]
  selectedTag: Tag | null
  isLoading: boolean
  error: string | null
}

const TOP_COUNT = 5

// Counts what the list has loaded. With a tag picked: only characters with that tag
// (the same filter the list uses), and no tag counts, since they'd all be the same tag.
function StatsPage({ characters, selectedTag, isLoading, error }: StatsPageProps) {
  const counted = filterByTag(characters, selectedTag)

  if (counted.length === 0 && isLoading) {
    return <StatusMessage kind="loading" text="Loading characters..." />
  }
  if (counted.length === 0 && error) {
    return <StatusMessage kind="error" text={error} />
  }

  const tagCounts = countByTag(counted)
  const statusCounts = countByStatus(counted)
  const topCharacters = mostEpisodes(counted, TOP_COUNT)
  const tagPart = selectedTag === null ? '' : ` · tag: ${TAG_LABELS[selectedTag]}`

  return (
    <>
      <h1>
        Stats for {counted.length} loaded characters{tagPart}
      </h1>

      {selectedTag === null && (
        <section>
          <h2>By tag</h2>
          <ul>
            {ALL_TAGS.map((tag) => (
              <li key={tag}>
                {TAG_LABELS[tag]}: {tagCounts[tag]}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>By status</h2>
        <ul>
          <li>Alive: {statusCounts.Alive}</li>
          <li>Dead: {statusCounts.Dead}</li>
          <li>Unknown: {statusCounts.unknown}</li>
        </ul>
      </section>

      <section>
        <h2>Most episodes</h2>
        <ol>
          {topCharacters.map((character) => (
            <li key={character.id}>
              <Link to={`/characters/${character.id}`}>{character.name}</Link>: {character.episode.length}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

export default StatsPage
