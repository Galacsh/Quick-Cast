import { useCallback, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Command, CommandEmpty, CommandInput, CommandList } from 'cmdk'
import { cn } from '@/lib/utils'
import { Shortcut } from '@/cast/components'
import { FormMultiSelectProps } from '@/cast/types'
import { useActions } from '@/cast/contexts'
import { isKeystroke } from '@/cast/utils'

export default function MultiSelect({
  autoFocus,
  className,
  title,
  error,
  placeholder,
  hasSelectedItems = false,
  children,
}: FormMultiSelectProps) {
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
    <Command
      className={cn(
        'w-full',
        'flex flex-col gap-2',
        'text-xs',
        'outline-none',
        className
      )}>
      <div className="flex items-center gap-3">
        <span className="text-cmdk-section-title whitespace-nowrap">
          {title}
        </span>
        <CommandInput
          autoFocus={autoFocus}
          placeholder={placeholder}
          onKeyDown={onShortcut}
          className={cn(
            'w-full p-2',
            'bg-transparent text-foreground placeholder:text-cmdk-placeholder',
            'border border-cmdk-background-separator focus:border-foreground',
            error && 'border-red-600 dark:border-red-300',
            'outline-none rounded'
          )}
        />
      </div>

      <div className="w-full flex items-center gap-3">
        <span className="invisible h-0 whitespace-nowrap">{title}</span>
        <div className="w-full flex items-center justify-between gap-2">
          {error ? (
            <span className="text-red-600 dark:text-red-300 px-2">{error}</span>
          ) : (
            <span className="invisible h-0" />
          )}
          <span className="text-cmdk-placeholder inline-flex items-center gap-2 px-2 shrink-0">
            Press <Shortcut keystroke={{ code: 'Enter' }} /> to toggle
            selection.
          </span>
        </div>
      </div>

      <CommandList className="w-full">
        {!hasSelectedItems && (
          <CommandEmpty
            className={cn(
              'w-full h-16 max-h-full',
              'flex items-center justify-center',
              'text-xs whitespace-pre-wrap',
              'text-cmdk-placeholder',
              'select-none pointer-events-none'
            )}>
            No results.
          </CommandEmpty>
        )}
        {children}
      </CommandList>
    </Command>
  )
}
