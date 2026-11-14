import type { Character, CharactersPage } from '../types/character'
import { getBatches } from '../utils/batches'
import { fetchCharacters } from './characters'

const BATCH_SIZE = 5
// Measured on 2026-11-14: the API allows about 30 requests per 10 seconds. With a 1 second pause
// the 7th batch got 429. With 2 seconds (2.5 requests a second) all 42 pages load in ~19 seconds.
const PAUSE_MS = 2000

// How far the loading got. Pages load in order and a failed batch adds nothing,
// so "characters" is always pages 1..nextPage-1 and loading can continue from nextPage.
export type LoadProgress = {
  characters: Character[]
  nextPage: number
  totalPages: number | null // unknown until page 1 arrives
  totalCount: number | null
}

export const EMPTY_PROGRESS: LoadProgress = { characters: [], nextPage: 1, totalPages: null, totalCount: null }

type LoadOptions = {
  onProgress: (progress: LoadProgress) => void
  shouldStop: () => boolean
  // These two are only replaced in the tests, so they don't call the real API or really wait
  fetchPage?: (page: number) => Promise<CharactersPage>
  wait?: (ms: number) => Promise<void>
  batchSize?: number
  pauseMs?: number
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Loads every page starting from startFrom: page 1 alone first (that's where the number of pages
// comes from), then the rest 5 at a time with a pause between batches so the API doesn't answer 429.
// Returns all the characters, or null if it was stopped. Throws if a batch fails; the last
// onProgress call says how far it got, so it can be called again from there.
export async function fetchAllCharacters(
  startFrom: LoadProgress,
  { onProgress, shouldStop, fetchPage = fetchCharacters, wait = delay, batchSize = BATCH_SIZE, pauseMs = PAUSE_MS }: LoadOptions,
): Promise<Character[] | null> {
  let progress = startFrom

  // Waits one tick before the first request. In dev, StrictMode starts the effect, stops it and
  // starts it again right away; this way the first run sees it was stopped before fetching anything.
  await wait(0)

  let totalPages = progress.totalPages
  if (totalPages === null) {
    if (shouldStop()) return null
    const firstPage = await fetchPage(1)
    if (shouldStop()) return null
    totalPages = firstPage.info.pages
    progress = { characters: firstPage.results, nextPage: 2, totalPages, totalCount: firstPage.info.count }
    onProgress(progress)
  }

  for (const batch of getBatches(progress.nextPage, totalPages, batchSize)) {
    await wait(pauseMs)
    if (shouldStop()) return null

    // The 5 requests run at the same time. If one fails, Promise.all fails and the batch adds nothing.
    const pages = await Promise.all(batch.map((page) => fetchPage(page)))
    if (shouldStop()) return null

    progress = {
      ...progress,
      characters: [...progress.characters, ...pages.flatMap((page) => page.results)],
      nextPage: batch[batch.length - 1] + 1,
    }
    onProgress(progress)
  }

  return progress.characters
}
