import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandInput, CommandList } from 'cmdk'
import Section from './section'
import type { ActionPanelProps } from '@/cast/types'

function ActionPanel({ className, children }: ActionPanelProps) {
  return (
    <Command
      className={cn(
        'h-full w-full',
        'text-foreground outline-none',
        'bg-cmdk-background-footer',
        'border rounded-lg',
        className
      )}>
      <CommandList
        className={cn(
          'max-w-[80dvw] w-[356px] max-h-[60dvh] h-full p-2',
          'overflow-auto overscroll-contain',
          '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:bg-transparent',
          '[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track:hover]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/20'
        )}>
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
