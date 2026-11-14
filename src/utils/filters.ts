import type { Character } from '../types/character'
import type { Tag } from '../types/tag'
import { getTags } from './tags'

// null means no tag is picked, so everyone stays.
// For rick/morty/... the API already sent only matching characters, so this keeps all of them.
// For "other" the API can't filter, so this is where it happens.
export function filterByTag(characters: Character[], tag: Tag | null): Character[] {
  if (tag === null) {
    return characters
  }
  return characters.filter((character) => getTags(character.name).includes(tag))
}
