import { useEffect, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import FooterButton from './button'
import Wrapper from '../wrapper'
import Suggestions from '../suggestions'
import SuggestionGroup from '../suggestion-group'
import FooterActionPanelItem from './action-panel-item'
import { cn } from '@/lib/utils'
import SearchInput from '../search-input'

export default function FooterActionPanel(props: {
  heading: string
  onOpen?: () => void
  onClose?: () => void
  focusOnClose?: () => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])

  useEffect(() => {
    if (open) {
      if (props.onOpen != null) props.onOpen()
    } else {
      if (props.onClose != null) props.onClose()
    }
  }, [open, props])

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal>
      <Popover.Trigger
        aria-expanded={open}
        onClick={() => setOpen(true)}
        disabled={props.disabled}
        tabIndex={-1}>
        <FooterButton title="Actions" shortcut={['⌘', 'K']} />
      </Popover.Trigger>
      <Popover.Content
        side="top"
        align="end"
        sideOffset={16}
        alignOffset={0}
        onCloseAutoFocus={(e: Event) => {
          if (props.focusOnClose) {
            e.preventDefault()
            props.focusOnClose()
          }
        }}
        className="shadow-xl">
        <Wrapper
          className={cn(
            'max-w-[80dvw] w-[356px] max-h-[80dvh] h-full',
            'bg-cmdk-background-footer',
            'border rounded-md'
          )}>
          <Suggestions className="flex-1" emptyClassName="h-16">
            <SuggestionGroup heading="Selected">
              <FooterActionPanelItem name="Open Application" shortcut={['⌘']} />
              <FooterActionPanelItem
                name="Show in Finder"
                shortcut={['⌘', '⌘']}
              />
              <FooterActionPanelItem
                name="Show Info in Finder"
                shortcut={['⌘']}
              />
              <FooterActionPanelItem name="Add to Favorites" shortcut={['⌘']} />
            </SuggestionGroup>
          </Suggestions>
          <SearchInput
            placeholder="Search for actions..."
            className={cn(
              'h-10 px-4 py-2',
              'text-xs',
              'border-t',
              'rounded-b-md'
            )}
          />
        </Wrapper>
      </Popover.Content>
    </Popover.Root>
  )
}
