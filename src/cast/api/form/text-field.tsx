import { useCallback, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useActions } from '@/cast/contexts'
import { isKeystroke } from '@/cast/utils'
import { cn } from '@/lib/utils'
import type { FormTextFieldProps } from '@/cast/types'

export default function TextField({
  autoFocus,
  defaultValue,
  error,
  placeholder,
  title,
  value,
  onBlur,
  onChange,
  onFocus,
  className,
}: FormTextFieldProps) {
  const { actions } = useActions()

  const onShortcut = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      for (const action of actions) {
        if (action.shortcut == null) continue
        if (isKeystroke(action.shortcut, e)) {
          e.stopPropagation()
          e.preventDefault()
          action.onAction()
          return
        }
      }
    },
    [actions]
  )

  return (
    <div
      className={cn(
        'w-full',
        'text-xs',
        'grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-2',
        className
      )}>
      <span className="text-cmdk-section-title">{title}</span>
      <input
        type="text"
        required
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onShortcut}
        className={cn(
          'w-full p-2',
          'bg-transparent text-foreground placeholder:text-cmdk-placeholder',
          'border border-cmdk-background-separator focus:border-foreground',
          error && 'border-red-600 dark:border-red-300',
          'outline-none rounded'
        )}
      />
      {error && (
        <>
          <div className="invisible" />
          <span className="text-red-600 dark:text-red-300 px-2">{error}</span>
        </>
      )}
    </div>
  )
}
