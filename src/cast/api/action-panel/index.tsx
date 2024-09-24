import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandInput, CommandList } from 'cmdk'
import Section from './section'
import type { ActionPanelProps } from '@/cast/types'

function ActionPanel({ className, children }: ActionPanelProps) {
  return (
    <Command
      className={cn(
        'max-w-[80dvw] w-[356px] max-h-[80dvh] h-full',
        'text-foreground outline-none',
        'bg-cmdk-background-footer',
        'border rounded-lg',
        className
      )}>
      <CommandList className={cn('p-2', 'overflow-auto overscroll-contain')}>
        <CommandEmpty
          className={cn(
            'w-full h-16',
            'flex items-center justify-center',
            'text-sm whitespace-pre-wrap',
            'text-cmdk-placeholder',
            'select-none pointer-events-none'
          )}>
          No results
        </CommandEmpty>
        {children}
      </CommandList>
      <CommandInput
        placeholder="Search for actions..."
        className={cn(
          'w-full h-10 px-4 py-2',
          'bg-transparent text-foreground placeholder:text-cmdk-placeholder',
          'outline-none border-cmdk-background-separator',
          'text-xs',
          'border-t rounded-b-md'
        )}
      />
    </Command>
  )
}

ActionPanel.Section = Section

export default ActionPanel
