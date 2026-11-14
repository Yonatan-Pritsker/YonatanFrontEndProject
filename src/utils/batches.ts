// Splits the pages firstPage..lastPage into groups of batchSize.
// getBatches(2, 12, 5) -> [[2, 3, 4, 5, 6], [7, 8, 9, 10, 11], [12]]
export function getBatches(firstPage: number, lastPage: number, batchSize: number): number[][] {
  const batches: number[][] = []
  for (let start = firstPage; start <= lastPage; start += batchSize) {
    const batch: number[] = []
    for (let page = start; page < start + batchSize && page <= lastPage; page++) {
      batch.push(page)
    }
    batches.push(batch)
  }
  return batches
}
