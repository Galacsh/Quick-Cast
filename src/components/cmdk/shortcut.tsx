import { cn } from '@/lib/utils'
import type { Keystroke } from '@/types'
import { useEffect } from 'react'

const KEY_DIGIT = /(Key|Digit)/

function hasCommandKey() {
  const platform = navigator.platform.toLowerCase()
  // Check if the platform is Mac
  return platform.includes('mac')
}

function isKeyStroke(k: Keystroke, e: KeyboardEvent) {
  if (
    e.code !== k.code ||
    (e.ctrlKey || e.metaKey) !== (k.ctrlMetaKey || false) ||
    e.altKey !== (k.altKey || false) ||
    e.shiftKey !== (k.shiftKey || false)
  ) {
    return false
  }

  return true
}

function toKeys(keystroke: Keystroke) {
  const keys: string[] = []

  // combination keys
  if (keystroke.ctrlMetaKey) {
    if (hasCommandKey()) keys.push('⌘')
    else keys.push('^')
  }
  if (keystroke.shiftKey) keys.push('⇧')
  if (keystroke.altKey) keys.push('⌥')

  // actual key
  switch (keystroke.code) {
    case 'Enter':
      keys.push('↵')
      break
    case 'Minus':
      keys.push('-')
      break
    case 'Equal':
      keys.push('=')
      break
    case 'BracketLeft':
      keys.push('[')
      break
    case 'BracketRight':
      keys.push(']')
      break
    case 'Semicolon':
      keys.push(';')
      break
    case 'Quote':
      keys.push("'")
      break
    case 'Backslash':
      keys.push('\\')
      break
    case 'Backquote':
      keys.push('`')
      break
    case 'Slash':
      keys.push('/')
      break
    case 'Period':
      keys.push('.')
      break
    case 'Comma':
      keys.push(',')
      break
    default:
      if (!KEY_DIGIT.test(keystroke.code))
        throw new Error('Unsupported keystroke')
      keys.push(keystroke.code.replace(KEY_DIGIT, ''))
      break
  }

  return keys
}

export default function Shortcut(props: {
  keystroke: Keystroke
  onKeystroke?: () => void
  className?: string
  keysClassName?: string
}) {
  const keys = toKeys(props.keystroke)

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (isKeyStroke(props.keystroke, e)) {
        if (props.onKeystroke) {
          e.preventDefault()
          props.onKeystroke()
        }
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [props])

  return (
    <div className={cn('flex gap-0.5', props.className)}>
      {keys &&
        keys.map((key, idx) => (
          <kbd
            key={idx}
            className={cn(
              'size-5 px-2 py-1',
              'flex items-center justify-center',
              'text-cmdk-kbd bg-cmdk-background-kbd',
              'group-aria-selected:text-cmdk-kbd-accent group-aria-selected:bg-cmdk-background-kbd-accent',
              'group-hover:text-cmdk-kbd-accent group-hover:bg-cmdk-background-kbd-accent',
              'rounded-sm',
              props.keysClassName
            )}>
            {key}
          </kbd>
        ))}
    </div>
  )
}
