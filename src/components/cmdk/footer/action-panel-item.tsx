import BaseItem from '../base-item'
import { cn } from '@/lib/utils'
import Shortcut from '../shortcut'
import type { Keystroke } from '@/types'

export default function FooterActionPanelItem(props: {
  name: string
  shortcut?: Keystroke
}) {
  return (
    <BaseItem
      className={cn('group', 'aria-selected:bg-cmdk-background-footer-accent')}>
      <span>{props.name}</span>
      {props.shortcut && <Shortcut keystroke={props.shortcut} />}
    </BaseItem>
  )
}
