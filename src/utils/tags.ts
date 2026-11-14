import type { Character } from '../types/character'
import type { Tag } from '../types/tag'

// The tags that come from the name. "other" isn't here, it's what's left when none of these match.
const NAME_TAGS: Tag[] = ['rick', 'morty', 'summer', 'beth', 'jerry']

// All tags in the order the filter buttons show them
export const ALL_TAGS: Tag[] = [...NAME_TAGS, 'other']

// Types the API uses for copies of a character. Goddess is here for Goddess Beth,
// who is a Mytholog of Beth but has type "Goddess".
const CLONE_TYPES = ['Clone', 'Mytholog', 'Goddess']

export const TAG_LABELS: Record<Tag, string> = {
  rick: 'Rick',
  morty: 'Morty',
  summer: 'Summer',
  beth: 'Beth',
  jerry: 'Jerry',
  other: 'Goofy one-offs',
}

// Every tag whose word is somewhere in the name, ignoring case.
// "Morty Rick" gets both, a name with none of them gets "other".
export function getTags(name: string): Tag[] {
  const lowerName = name.toLowerCase()
  const tags = NAME_TAGS.filter((tag) => lowerName.includes(tag))
  return tags.length > 0 ? tags : ['other']
}

// Only needs the name and the type, so it gets just those two fields
export function isClone(character: Pick<Character, 'name' | 'type'>): boolean {
  return CLONE_TYPES.includes(character.type) || character.name.toLowerCase().includes('clone')
}
