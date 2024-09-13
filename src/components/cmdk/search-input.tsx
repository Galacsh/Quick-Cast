import { forwardRef, type ComponentProps } from 'react'
import { CommandInput } from 'cmdk'
import { cn } from '@/lib/utils'

type SearchInputProps = ComponentProps<typeof CommandInput>

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <CommandInput
        {...props}
        ref={ref}
        className={cn(
          'shrink-0',
          'w-full',
          'bg-transparent text-foreground placeholder:text-cmdk-placeholder',
          'outline-none border-cmdk-background-separator',
          className
        )}
      />
    )
  }
)
SearchInput.displayName = 'SearchInput'

export default SearchInput
