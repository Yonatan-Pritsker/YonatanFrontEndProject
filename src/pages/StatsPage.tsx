import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EMPTY_PROGRESS, fetchAllCharacters, type LoadProgress } from '../api/allCharacters'
import StatusMessage from '../components/StatusMessage'
import type { Character } from '../types/character'
import { loadCachedCharacters, saveCachedCharacters } from '../utils/allCharactersCache'
import { countByStatus, countByTag, mostEpisodes } from '../utils/stats'
import { ALL_TAGS, TAG_LABELS } from '../utils/tags'

const TOP_COUNT = 5

// Counts all 826 characters, not what the list loaded, and ignores the list's tag.
// Only this page uses this data, so it all lives here and not in App.
function StatsPage() {
  // Already loaded in this tab? Then there's nothing to load.
  const [allCharacters, setAllCharacters] = useState<Character[] | null>(() => loadCachedCharacters())
  // Where loading starts from. null = nothing to load. Changing it is what (re)starts the effect.
  const [startFrom, setStartFrom] = useState<LoadProgress | null>(() =>
    allCharacters === null ? EMPTY_PROGRESS : null,
  )
  const [progress, setProgress] = useState<LoadProgress>(EMPTY_PROGRESS)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (startFrom === null) return

    // Set by the cleanup when the user leaves the page: the loop stops before the next batch.
    // Nothing is saved then, so the next visit starts over.
    let stopped = false

    fetchAllCharacters(startFrom, { onProgress: setProgress, shouldStop: () => stopped })
      .then((characters) => {
        if (stopped || characters === null) return
        setAllCharacters(characters)
        // Saved only here, after everything loaded
        saveCachedCharacters(characters)
      })
      .catch(() => {
        if (!stopped) setError('Could not load all the characters (the API may be getting too many requests).')
      })

    return () => {
      stopped = true
    }
  }, [startFrom])

  // Continues from the last batch that worked. A new object every time: if progress is still
  // EMPTY_PROGRESS (page 1 failed), passing the same object wouldn't change state or rerun the effect.
  function handleTryAgain() {
    setError(null)
    setStartFrom({ ...progress })
  }

  if (allCharacters === null) {
    const loadedText =
      progress.totalCount === null
        ? 'Loading characters...'
        : `Loaded ${progress.characters.length} / ${progress.totalCount}`

    return (
      <>
        <h1>Stats</h1>
        {error ? (
          <>
            <StatusMessage kind="error" text={error} />
            <p>{loadedText} so far.</p>
            <button type="button" className="load-more" onClick={handleTryAgain}>
              Try again
            </button>
          </>
        ) : (
          <StatusMessage kind="loading" text={loadedText} />
        )}
      </>
    )
  }

  const tagCounts = countByTag(allCharacters)
  const statusCounts = countByStatus(allCharacters)
  const topCharacters = mostEpisodes(allCharacters, TOP_COUNT)

  return (
    <>
      <h1>Stats for all {allCharacters.length} characters</h1>

      <div className="stats-sections">
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
      </div>
    </>
  )
}

export default StatsPage
