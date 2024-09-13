import { Command } from 'cmdk'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type WrapperProps = ComponentProps<typeof Command>

export default function Wrapper({
  className,
  children,
  ...props
}: WrapperProps) {
  return (
    <Command
      {...props}
      className={cn(
        'h-full w-full',
        'flex flex-col',
        'text-foreground bg-background outline-none',
        className
      )}>
      {children}
    </Command>
  )
}
