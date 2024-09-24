import { cn } from '@/lib/utils'
import type { Keystroke } from '@/cast/types'

export default function Shortcut(props: {
  keystroke: Keystroke
  className?: string
  keysClassName?: string
}) {
  const keys = toKeys(props.keystroke)

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

const KEY_DIGIT = /(Key|Digit)/

/**
 * Check if it is macOS.
 *
 * @returns true if macOS, else false
 */
function isMacOS() {
  const platform = navigator.userAgent.toLowerCase()
  return platform.includes('mac')
}

/**
 * Turn keystroke to sequence of 'keyboard' letters.
 */
function toKeys(keystroke: Keystroke) {
  const keys: string[] = []

  // combination keys
  if (keystroke.ctrlMeta) {
    if (isMacOS()) keys.push('⌘')
    else keys.push('^')
  }
  if (keystroke.shift) keys.push('⇧')
  if (keystroke.alt) keys.push('⌥')

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
