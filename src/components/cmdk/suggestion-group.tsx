import { CommandGroup } from 'cmdk'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SuggestionGroupProps = {
  heading: string
  children?: ReactNode
}

export default function SuggestionGroup({
  heading,
  children,
}: SuggestionGroupProps) {
  return (
    <CommandGroup
      heading={heading}
      className={cn(
        'mt-2 first:mt-0',
        '[&>[cmdk-group-heading]]:p-2 [&>[cmdk-group-heading]]:pt-1',
        '[&>[cmdk-group-heading]]:flex [&>[cmdk-group-heading]]:items-center',
        '[&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:text-cmdk-section-title',
        '[&>[cmdk-group-heading]]:select-none'
      )}>
      {children}
    </CommandGroup>
  )
}
