import type { SortOption } from '../types/sort'

type SortControlProps = {
  sortBy: SortOption
  onSortChange: (sortBy: SortOption) => void
}

// Two buttons like the tag filter. aria-pressed marks the one in use.
function SortControl({ sortBy, onSortChange }: SortControlProps) {
  return (
    <div className="sort-control">
      Sort:{' '}
      <button type="button" aria-pressed={sortBy === 'default'} onClick={() => onSortChange('default')}>
        API order
      </button>{' '}
      <button type="button" aria-pressed={sortBy === 'last-seen'} onClick={() => onSortChange('last-seen')}>
        Last seen
      </button>
    </div>
  )
}

export default SortControl
