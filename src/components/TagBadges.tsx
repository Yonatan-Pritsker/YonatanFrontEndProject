import type { Tag } from '../types/tag'
import { TAG_LABELS } from '../utils/tags'

type TagBadgesProps = {
  tags: Tag[]
}

function TagBadges({ tags }: TagBadgesProps) {
  return (
    <ul className="tag-badges">
      {tags.map((tag) => (
        <li key={tag} className={`tag tag-${tag}`}>
          {TAG_LABELS[tag]}
        </li>
      ))}
    </ul>
  )
}

export default TagBadges
