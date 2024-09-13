import { ComponentProps, forwardRef } from 'react'
import { CommandList, CommandEmpty } from 'cmdk'
import { cn } from '@/lib/utils'

type SuggestionsProps = ComponentProps<typeof CommandList> & {
  emptyClassName?: string
}

const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  ({ children, className, emptyClassName, ...props }, ref) => {
    return (
      <CommandList
        {...props}
        ref={ref}
        className={cn(
          'w-full h-full p-2',
          'overflow-auto overscroll-contain',
          className
        )}>
        <CommandEmpty
          className={cn(
            'w-full h-80',
            'flex items-center justify-center',
            'text-sm whitespace-pre-wrap',
            'text-cmdk-placeholder',
            'select-none pointer-events-none',
            emptyClassName
          )}>
          No Results.
        </CommandEmpty>
        {children}
      </CommandList>
    )
  }
)
Suggestions.displayName = 'Suggestions'

export default Suggestions
