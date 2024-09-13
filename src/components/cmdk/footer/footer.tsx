import { HomeIcon } from '@radix-ui/react-icons'
import FooterButton from './button'
import FooterActionPanel from './action-panel'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'

export default function Footer(props: {
  icon?: ComponentType
  title?: string
  onOpen?: () => void
  onClose?: () => void
  focusOnPanelClose?: () => void
}) {
  return (
    <div
      className={cn(
        'shrink-0',
        'w-full h-10 p-2',
        'flex items-center justify-between',
        'bg-cmdk-background-footer',
        'text-xs',
        'border-t border-cmdk-background-separator dark:border-none'
      )}>
      {/* left side */}
      <div className="flex items-center gap-2 select-none pointer-events-none">
        {props.icon ? <props.icon /> : <HomeIcon />}
        {props.title}
      </div>
      {/* right side */}
      <div className="flex items-center gap-2 group/fbs">
        <FooterButton title="First in action panel" shortcut={['↵']} />
        <div className="h-2.5 w-0.5 bg-cmdk-background-separator group-hover/fbs:invisible"></div>
        <FooterActionPanel
          heading="Selected Item"
          onOpen={props.onOpen}
          onClose={props.onClose}
          focusOnClose={props.focusOnPanelClose}
        />
      </div>
    </div>
  )
}
