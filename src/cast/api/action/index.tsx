import { useCallback, useRef } from 'react'
import { CommandItem } from 'cmdk'
import { v4 as uuid } from 'uuid'
import { Shortcut } from '@/cast/components'
import { usePanel } from '@/cast/contexts'
import { cn } from '@/lib/utils'
import type { ActionProps } from '@/cast/types'

export default function Action({
  icon: Icon,
  title,
  shortcut,
  onAction,
}: ActionProps) {
  const id = useRef<string>(uuid())
  const ref = useRef<HTMLDivElement>(null)
  const { setPanelOpen } = usePanel()

  const onSelect = useCallback(() => {
    onAction()
    setPanelOpen(false)
  }, [onAction, setPanelOpen])

  return (
    <CommandItem
      ref={ref}
      value={id.current}
      keywords={[title]}
      onSelect={onSelect}
      className={cn(
        'group',
        'h-10 px-2',
        'flex items-center justify-between gap-3',
        'cursor-pointer select-none',
        'text-sm',
        'rounded-md',
        'aria-selected:bg-cmdk-background-footer-accent'
      )}>
      <div className="max-w-full flex items-center gap-2 min-w-0">
        {Icon && (
          <div className="size-[1.125rem] flex items-center justify-center shrink-0">
            <Icon className="size-4" />
          </div>
        )}
        <span className="text-foreground truncate max-w-full flex-grow">
          {title}
        </span>
      </div>
      {shortcut && (
        <div className="shrink-0">
          <Shortcut keystroke={shortcut} />
        </div>
      )}
    </CommandItem>
  )
}
