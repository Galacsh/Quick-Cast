import { cn } from '@/lib/utils'
import Shortcut from '../shortcut'
import { forwardRef } from 'react'
import type { Keystroke } from '@/types'

type FooterButtonProps = {
  text: string
  shortcut?: Keystroke
  className?: string
  onTrigger?: () => void
}

const FooterButton = forwardRef<HTMLButtonElement, FooterButtonProps>(
  ({ text: title, shortcut, onTrigger, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onTrigger}
        tabIndex={-1}
        className={cn(
          'group',
          'p-1 rounded-md',
          'inline-flex items-center justify-center',
          'text-xs font-normal whitespace-nowrap',
          'text-foreground bg-transparent hover:bg-cmdk-background-footer-accent transition-none',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}>
        <span className="px-1">{title}</span>
        {shortcut && (
          <Shortcut
            keystroke={shortcut}
            onKeystroke={onTrigger}
            className="ml-1"
          />
        )}
      </button>
    )
  }
)
FooterButton.displayName = 'FooterButton'

export default FooterButton
