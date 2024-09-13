import { cn } from '@/lib/utils'
import Shortcut from '../shortcut'

type FooterButtonProps = {
  title: string
  shortcut?: string[]
  className?: string
  onClick?: () => void
}

export default function FooterButton({
  title,
  shortcut,
  className,
  onClick,
  ...props
}: FooterButtonProps) {
  return (
    <button
      onClick={onClick}
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
      {shortcut && <Shortcut keys={shortcut} className="ml-1" />}
    </button>
  )
}
