import type { Keystroke } from '../types'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

export function isKeystroke(
  k: Keystroke,
  e: KeyboardEvent | ReactKeyboardEvent<unknown>
): boolean {
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
