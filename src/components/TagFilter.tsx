import type { Tag } from '../types/tag'
import { ALL_TAGS, TAG_LABELS } from '../utils/tags'

type TagFilterProps = {
  selectedTag: Tag | null
  onTagChange: (tag: Tag | null) => void
}

// "All" is null, the rest are the tags. aria-pressed marks the picked button.
function TagFilter({ selectedTag, onTagChange }: TagFilterProps) {
  return (
    <div className="tag-filter">
      <button type="button" aria-pressed={selectedTag === null} onClick={() => onTagChange(null)}>
        All
      </button>
      {ALL_TAGS.map((tag) => (
        <button key={tag} type="button" aria-pressed={selectedTag === tag} onClick={() => onTagChange(tag)}>
          {TAG_LABELS[tag]}
        </button>
      ))}
    </div>
  )
}

export default TagFilter
