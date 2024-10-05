import {
  useCallback,
  useEffect,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { Command, CommandEmpty, CommandInput, CommandList } from 'cmdk'
import { ArrowLeft } from 'lucide-react'
import Item from './item'
import Section from './section'
import EmptyWatcher from './empty-watcher'
import { useSearch, useNavigation, usePanel, useActions } from '@/cast/contexts'
import { cn } from '@/lib/utils'
import { isKeystroke } from '@/cast/utils'
import type { ListProps } from '@/cast/types'

function List({
  navigationTitle,
  searchBarPlaceholder,
  filtering = true,
  className,
  children,
}: ListProps) {
  const { ref: searchRef, search, setSearch, clear } = useSearch()
  const { pop, isRoot, setTitle } = useNavigation()
  const { actions } = useActions()
  const { isPanelOpen } = usePanel()

  useEffect(() => {
    setTitle(navigationTitle)
  }, [navigationTitle, setTitle])

  useEffect(() => {
    function previous(e: KeyboardEvent) {
      if (isPanelOpen) return

      if (e.key === 'Backspace' && search === '' && !isRoot()) {
        e.stopImmediatePropagation()
        e.preventDefault()
        pop()
      } else if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        e.preventDefault()
        if (search === '') pop()
        else clear()
      }
    }

    window.addEventListener('keydown', previous)
    return () => window.removeEventListener('keydown', previous)
  }, [clear, isPanelOpen, isRoot, pop, search])

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
      shouldFilter={filtering}
      className={cn(
        'h-full w-full',
        'text-foreground bg-background outline-none'
      )}>
      <div
        className={cn(
          'w-full h-14 px-4',
          'flex items-center gap-2',
          'border-b border-cmdk-background-separator'
        )}>
        {!isRoot() && (
          <button
            type="button"
            tabIndex={-1}
            onClick={pop}
            className={cn(
              'size-6 shrink-0 rounded-md',
              'inline-flex items-center justify-center',
              'bg-cmdk-background-kbd hover:bg-cmdk-background-kbd-accent',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
            )}>
            <ArrowLeft className="size-4" />
          </button>
        )}
        <CommandInput
          ref={searchRef}
          autoFocus
          value={search}
          onValueChange={setSearch}
          placeholder={searchBarPlaceholder}
          onKeyDown={onShortcut}
          className={cn(
            'flex-grow w-full h-14 py-4',
            'bg-transparent text-foreground placeholder:text-cmdk-placeholder',
            'outline-none',
            className
          )}
        />
      </div>
      <CommandList
        className={cn(
          'w-full max-h-[calc(100%-3.5rem)] p-2',
          'overflow-auto overscroll-contain',
          '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:bg-transparent',
          '[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track:hover]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/20'
        )}>
        <CommandEmpty
          className={cn(
            'w-full h-80 max-h-full',
            'flex items-center justify-center',
            'text-sm whitespace-pre-wrap',
            'text-cmdk-placeholder',
            'select-none pointer-events-none'
          )}>
          No Results
        </CommandEmpty>
        {children}
      </CommandList>
      <EmptyWatcher />
    </Command>
  )
}

List.Item = Item
List.Section = Section

export default List
