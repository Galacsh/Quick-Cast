import BaseItem from '../base-item'
import { cn } from '@/lib/utils'
import Shortcut from '../shortcut'

export default function FooterActionPanelItem(props: {
  name: string
  shortcut?: string[]
}) {
  return (
    <BaseItem
      className={cn('group', 'aria-selected:bg-cmdk-background-footer-accent')}>
      <span>{props.name}</span>
      {props.shortcut && <Shortcut keys={props.shortcut} />}
    </BaseItem>
  )
}
