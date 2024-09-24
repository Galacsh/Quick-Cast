import { useEffect } from 'react'
import { Command, CommandEmpty, CommandInput, CommandList } from 'cmdk'
import Item from './item'
import Section from './section'
import EmptyWatcher from './empty-watcher'
import { useSearch, useNavigation } from '@/cast/contexts'
import { cn } from '@/lib/utils'
import type { ListProps } from '@/cast/types'

function List({
  navigationTitle,
  searchBarPlaceholder,
  className,
  children,
}: ListProps) {
  const { ref: searchRef, search, setSearch } = useSearch()
  const { setTitle } = useNavigation()

  useEffect(() => {
    setTitle(navigationTitle)
  }, [navigationTitle, setTitle])

  return (
    <Command
      className={cn(
        'h-full w-full',
        'text-foreground bg-background outline-none'
      )}>
      <CommandInput
        ref={searchRef}
        autoFocus
        value={search}
        onValueChange={setSearch}
        placeholder={searchBarPlaceholder}
        className={cn(
          'w-full h-14',
          'bg-transparent text-foreground placeholder:text-cmdk-placeholder',
          'outline-none border-cmdk-background-separator',
          'p-4 border-b',
          className
        )}
      />
      <CommandList
        className={cn(
          'w-full max-h-[calc(100%-3.5rem)] p-2',
          'overflow-auto overscroll-contain'
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
