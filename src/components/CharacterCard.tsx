import { Link } from 'react-router-dom'
import type { Character } from '../types/character'
import { getLastEpisode } from '../utils/episodes'
import { getTags, isClone } from '../utils/tags'
import CloneBadge from './CloneBadge'
import TagBadges from './TagBadges'

type CharacterCardProps = {
  character: Character
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <Link to={`/characters/${character.id}`}>
        <img src={character.image} alt={character.name} width={150} height={150} />
        <h2>{character.name}</h2>
      </Link>
      <TagBadges tags={getTags(character.name)} />
      {isClone(character) && <CloneBadge />}
      {/* So the "Last seen" sort can be checked by eye */}
      <p className="last-seen">Last seen: ep. {getLastEpisode(character)}</p>
    </article>
  )
}

export default CharacterCard
