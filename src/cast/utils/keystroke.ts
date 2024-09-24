import type { Keystroke } from '../types'

export function isKeystroke(k: Keystroke, e: KeyboardEvent): boolean {
  const {
    code,
    alt: altKey = false,
    shift: shiftKey = false,
    ctrlMeta: ctrlMetaKey = false,
  } = k

  return (
    e.code === code &&
    (e.ctrlKey || e.metaKey) === ctrlMetaKey &&
    e.altKey === altKey &&
    e.shiftKey === shiftKey
  )
}
