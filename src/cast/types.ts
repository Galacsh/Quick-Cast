import type { ComponentType, ReactElement, ReactNode } from 'react'

export type Keystroke = {
  code: KeyboardEvent['code']
  alt?: boolean
  shift?: boolean
  ctrlMeta?: boolean
}

// =============================

export type ActionEssentials = {
  title: string
  shortcut?: Keystroke
  onAction: () => void
  isDefault?: boolean
}

export type ActionProps = ActionEssentials & {
  icon?: ComponentType<{ className?: string }>
}

export type ActionPanelSectionProps = {
  title: string
  className?: string
  children?: ActionElement | Iterable<ActionElement>
}

export type ActionPanelProps = {
  className?: string
  children?: ActionPanelChildren
}

export type ItemProps = {
  icon?: ComponentType<{ className?: string }>
  title: string
  subtitle?: string
  accessories?: ReactNode
  actions: ActionPanelElement
  className?: string
}

export type ItemSectionProps = {
  title: string
  className?: string
  children?: ItemElement | Iterable<ItemElement>
}

export type ListProps = {
  navigationTitle: string
  searchBarPlaceholder: string
  className?: string
  children?:
    | ItemElement
    | Iterable<ItemElement>
    | ItemSectionElement
    | Iterable<ItemSectionElement>
}

export type ActionPanelElement = ReactElement<ActionPanelProps>

export type ActionPanelSectionElement = ReactElement<ActionPanelSectionProps>

export type ActionElement = ReactElement<ActionProps>

export type ActionPanelChildren =
  | ActionElement
  | ActionPanelSectionElement
  | Iterable<ActionElement | ActionPanelSectionElement>

type ListElement = ReactElement<ListProps>

type ItemSectionElement = ReactElement<ItemSectionProps>

type ItemElement = ReactElement<ItemProps>

// =============================

export type Extension = {
  name: string
  icon: ComponentType<{ className?: string }>
  commands: Command[]
}

export type Command = {
  icon: ComponentType<{ className?: string }>
  name: string
} & (WithView | WithoutView)

type WithView = {
  mode: 'view'
  view: ListElement
}

type WithoutView = {
  mode: 'no-view'
  action: () => void
}
