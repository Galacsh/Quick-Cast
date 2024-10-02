import { useEffect, useRef } from 'react'
import { CommandItem, useCommandState } from 'cmdk'
import { v4 as uuid } from 'uuid'
import { useActions, usePanel } from '@/cast/contexts'
import { toActions } from '@/cast/utils'
import { cn } from '@/lib/utils'
import type { ItemProps } from '@/cast/types'

export default function Item({
  icon: Icon,
  title,
  subtitle,
  keywords,
  accessories,
  actions: ActionPanel,
  className,
}: ItemProps) {
  const id = useRef<string>(uuid())
  const { setContent } = usePanel()
  const { defaultAction, setActions } = useActions()
  const isSelected = useCommandState(({ value }) => value === id.current)
  const ref = useRef<HTMLDivElement>(null)

  // update action panel items and actions
  useEffect(() => {
    if (isSelected) {
      setContent(ActionPanel)
      setActions(toActions(ActionPanel))
    }
  }, [ActionPanel, isSelected, setActions, setContent])

  // click event
  useEffect(() => {
    const node = ref.current

    function onClick() {
      defaultAction?.onAction()
    }

    node?.addEventListener('click', onClick)
    return () => node?.removeEventListener('click', onClick)
  }, [defaultAction])

  return (
    <CommandItem
      ref={ref}
      value={id.current}
      keywords={keywords != null ? [title, ...keywords] : [title]}
      className={cn(
        'h-10 px-2',
        'flex items-center justify-between gap-3',
        'cursor-pointer select-none',
        'text-sm',
        'rounded-md',
        'aria-selected:bg-cmdk-background-accent',
        className
      )}>
      <div className="max-w-full flex items-center gap-3 min-w-0">
        {Icon && (
          <div className="size-[1.125rem] flex items-center justify-center shrink-0">
            <Icon className="size-4" />
          </div>
        )}
        <span className="text-foreground truncate max-w-full flex-grow">
          {title}
        </span>
        {subtitle && (
          <span className="text-cmdk-placeholder whitespace-nowrap">
            {subtitle}
          </span>
        )}
      </div>
      {accessories && <div className="shrink-0">{accessories}</div>}
    </CommandItem>
  )
}
