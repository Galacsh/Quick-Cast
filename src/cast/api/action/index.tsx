import { useEffect, useRef } from 'react'
import { CommandItem, useCommandState } from 'cmdk'
import { v4 as uuid } from 'uuid'
import { Shortcut } from '@/cast/components'
import { usePanel } from '@/cast/contexts'
import { isKeystroke } from '@/cast/utils'
import { cn } from '@/lib/utils'
import type { ActionProps } from '@/cast/types'

export default function Action({
  icon: Icon,
  title,
  shortcut,
  onAction,
  isDefault = false,
}: ActionProps) {
  const id = useRef<string>(uuid())
  const ref = useRef<HTMLDivElement>(null)
  const isSelected = useCommandState(({ value }) => value === id.current)
  const { isPanelOpen, setPanelOpen } = usePanel()

  // click event
  useEffect(() => {
    const node = ref.current

    function onClick() {
      onAction()
      setPanelOpen(false)
    }

    node?.addEventListener('click', onClick)
    return () => node?.removeEventListener('click', onClick)
  }, [onAction, setPanelOpen])

  // keyboard event
  useEffect(() => {
    function onShortcut(e: KeyboardEvent) {
      if (!isPanelOpen) return

      if (isSelected && isKeystroke({ code: 'Enter' }, e)) {
        e.preventDefault()
        e.stopImmediatePropagation()
        onAction()
        setPanelOpen(false)
        return
      }
    }

    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [isPanelOpen, isSelected, onAction, setPanelOpen])

  return (
    <CommandItem
      ref={ref}
      value={id.current}
      keywords={[title]}
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
      {(isDefault || shortcut) && (
        <div className="shrink-0">
          {isDefault ? (
            <Shortcut keystroke={{ code: 'Enter' }} />
          ) : (
            shortcut && <Shortcut keystroke={shortcut} />
          )}
        </div>
      )}
    </CommandItem>
  )
}
