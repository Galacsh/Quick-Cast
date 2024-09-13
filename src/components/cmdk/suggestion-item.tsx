import BaseItem from './base-item'
import type { ComponentType } from 'react'

type SuggestionItemProps = {
  name: string
  type: string
  extension?: string
  icon?: ComponentType<{ className?: string }>
}

export default function SuggestionItem(props: SuggestionItemProps) {
  return (
    <BaseItem className="aria-selected:bg-cmdk-background-accent">
      <div className="flex items-center gap-3">
        <div className="size-[18px] flex items-center justify-center">
          {props.icon && <props.icon className="size-4" />}
        </div>
        <span className="text-foreground">{props.name}</span>
        {props.extension && (
          <span className="text-cmdk-placeholder">{props.extension}</span>
        )}
      </div>
      <span className="text-cmdk-placeholder">{props.type}</span>
    </BaseItem>
  )
}
