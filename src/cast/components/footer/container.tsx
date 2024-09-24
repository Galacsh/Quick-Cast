import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type FooterContainer = {
  className?: string
  children?: ReactNode
}

export default function FooterContainer({
  className,
  children,
}: FooterContainer) {
  return (
    <div
      className={cn(
        'w-cmdk max-w-full h-cmdk-footer max-h-cmdk-footer p-2',
        'flex items-center',
        'bg-cmdk-background-footer',
        'text-xs',
        'border-t border-cmdk-background-separator dark:border-none',
        className
      )}>
      {children}
    </div>
  )
}
