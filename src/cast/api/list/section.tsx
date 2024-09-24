import { CommandGroup } from 'cmdk'
import { cn } from '@/lib/utils'
import type { ItemSectionProps } from '@/cast/types'

export default function Section({
  title,
  className,
  children,
  ...props
}: ItemSectionProps) {
  return (
    <CommandGroup
      {...props}
      heading={title}
      className={cn(
        'mt-2 first:mt-0',
        '[&>[cmdk-group-heading]]:p-2 [&>[cmdk-group-heading]]:pt-1',
        '[&>[cmdk-group-heading]]:flex [&>[cmdk-group-heading]]:items-center',
        '[&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:font-medium',
        '[&>[cmdk-group-heading]]:text-cmdk-section-title',
        '[&>[cmdk-group-heading]]:select-none',
        className
      )}>
      {children}
    </CommandGroup>
  )
}
