import { forwardRef } from 'react'
import Shortcut from '@/cast/components/shortcut'
import { cn } from '@/lib/utils'
import type { Keystroke } from '@/cast/types'

type FooterButtonProps = {
  text: string
  shortcut?: Keystroke
  onClick?: () => void
  className?: string
}

const FooterButton = forwardRef<HTMLButtonElement, FooterButtonProps>(
  ({ text: title, shortcut, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        tabIndex={-1}
        onClick={onClick}
        className={cn(
          'group',
          'p-1 rounded-md',
          'inline-flex items-center justify-center',
          'text-xs font-normal whitespace-nowrap select-none',
          'text-foreground bg-transparent hover:bg-cmdk-background-footer-accent transition-none',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          className
        )}
        {...props}>
        <span className="px-1">{title}</span>
        {shortcut && <Shortcut keystroke={shortcut} className="ml-1" />}
      </button>
    )
  }
)
FooterButton.displayName = 'CastFooterButton'

export default FooterButton
