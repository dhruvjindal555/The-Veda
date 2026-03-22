export const INITIAL_SUGGESTIONS = [
  'Who was Karna and why is he the most tragic figure in the Mahabharata?',
  'What does the Bhagavad Gita teach about action and detachment?',
  'What is the symbolic meaning of Shiva as Nataraja?',
  'How does Hindu cosmology measure time?',
  'What is the difference between Atman and Brahman?',
]

export const POLISH_OPTIONS = [
  { id: 'elaborate',     label: 'Elaborate more' },
  { id: 'simplify',      label: 'Simplify this' },
  { id: 'philosophical', label: 'Make it philosophical' },
  { id: 'story',         label: 'Tell it as a story' },
]

export function polishPrompt(original: string, option: string): string {
  switch (option) {
    case 'elaborate':     return `${original} Please go into great depth and detail.`
    case 'simplify':      return `${original} Please explain this in simple, accessible language.`
    case 'philosophical': return `${original} Focus specifically on the philosophical and symbolic dimensions.`
    case 'story':         return `${original} Please explain this through a story or narrative from the texts.`
    default:              return original
  }
}