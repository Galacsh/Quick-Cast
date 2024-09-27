import { useEffect, useRef } from 'react'
import { CommandItem, useCommandState } from 'cmdk'
import { v4 as uuid } from 'uuid'
import { useActions, usePanel } from '@/cast/contexts'
import { isKeystroke, toActions } from '@/cast/utils'
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
  const { setContent, isPanelOpen } = usePanel()
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

  // on select event
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (isPanelOpen || !isSelected) return

      if (isKeystroke({ code: 'Enter' }, e)) {
        e.preventDefault()
        e.stopImmediatePropagation()
        defaultAction?.onAction()
      }
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [defaultAction, isPanelOpen, isSelected])

  return (
    <CommandItem
      ref={ref}
      value={id.current}
      keywords={keywords != null ? [title, ...keywords] : [title]}
      className={cn(
        'h-10 px-2',
        'flex items-center justify-between gap-2',
        'cursor-pointer select-none',
        'text-sm',
        'aria-selected:bg-cmdk-background-accent',
        'rounded-md',
        className
      )}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="size-[1.125rem] flex items-center justify-center">
            <Icon className="size-4" />
          </div>
        )}
        <span className="text-foreground">{title}</span>
        {subtitle && <span className="text-cmdk-placeholder">{subtitle}</span>}
      </div>
      {accessories}
    </CommandItem>
  )
}
