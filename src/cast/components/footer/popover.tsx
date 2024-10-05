import { useCallback, useEffect, type ReactNode } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { useMain, usePanel } from '@/cast/contexts'
import { isKeystroke } from '@/cast/utils'

type FooterPopoverProps = {
  trigger: ReactNode
  children?: ReactNode
}

export default function FooterPopover({
  trigger,
  children,
}: FooterPopoverProps) {
  const { isPanelOpen, setPanelOpen } = usePanel()
  const { ref: main, enableScrolling, disableScrolling } = useMain()

  /** Prevent escape key triggering "pop view" */
  const onEscapeKeyDown = useCallback(function (e: Event) {
    e.stopImmediatePropagation()
  }, [])

  /** Focus search bar on close */
  const onCloseAutoFocus = useCallback(
    function (e: Event) {
      function focusInput() {
        main.current?.querySelector('input')?.focus()
      }

      e.stopImmediatePropagation()
      e.preventDefault()
      focusInput()
    },
    [main]
  )

  // Toggle popover on `Ctrl(Meta) + K`
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

  // Disable scrolling on popover open
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
