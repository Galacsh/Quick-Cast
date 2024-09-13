import { CommandItem } from 'cmdk'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type BaseItemProps = ComponentProps<typeof CommandItem>

export default function BaseItem({
  className,
  children,
  ...props
}: BaseItemProps) {
  return (
    <CommandItem
      {...props}
      className={cn(
        'h-10 px-2',
        'flex items-center justify-between gap-2',
        'cursor-pointer select-none',
        'text-sm',
        'aria-selected:bg-cmdk-background-accent',
        'rounded-md',
        className
      )}>
      {children}
    </CommandItem>
  )
}
