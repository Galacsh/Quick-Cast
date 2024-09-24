import { useCallback, useEffect, type ReactNode } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { useMain, useSearch, usePanel } from '@/cast/contexts'
import { isKeystroke } from '@/cast/utils'

type FooterPopoverProps = {
  trigger: ReactNode
  children?: ReactNode
}

export default function FooterPopover({
  trigger,
  children,
}: FooterPopoverProps) {
  const { focus: focusSearchBar } = useSearch()
  const { isPanelOpen, setPanelOpen } = usePanel()
  const { enableScrolling, disableScrolling } = useMain()

  const onEscapeKeyDown = useCallback(
    (e: Event) => e.stopImmediatePropagation(),
    []
  )

  const onCloseAutoFocus = useCallback(
    (e: Event) => {
      e.preventDefault()
      focusSearchBar()
    },
    [focusSearchBar]
  )

  useEffect(() => {
    function onShortcut(e: KeyboardEvent) {
      if (isKeystroke({ code: 'KeyK', ctrlMeta: true }, e)) {
        e.preventDefault()
        e.stopImmediatePropagation()
        setPanelOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [setPanelOpen])

  useEffect(() => {
    if (isPanelOpen) disableScrolling()
    else enableScrolling()
  }, [disableScrolling, enableScrolling, isPanelOpen])

  return (
    <Popover.Root open={isPanelOpen} onOpenChange={setPanelOpen} modal>
      <Popover.Trigger
        tabIndex={-1}
        aria-expanded={isPanelOpen}
        onClick={() => setPanelOpen(true)}
        asChild>
        {trigger}
      </Popover.Trigger>
      <Popover.Content
        side="top"
        align="end"
        sideOffset={16}
        alignOffset={0}
        onEscapeKeyDown={onEscapeKeyDown}
        onCloseAutoFocus={onCloseAutoFocus}
        className="shadow-xl">
        {children}
      </Popover.Content>
    </Popover.Root>
  )
}
