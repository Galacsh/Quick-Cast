import type {
  ReactNode,
  ReactElement,
  ComponentType,
  FocusEventHandler,
  ChangeEventHandler,
} from 'react'

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
  keywords?: string[]
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
  filtering?: boolean
  className?: string
  children?:
    | ItemElement
    | ItemSectionElement
    | Iterable<ItemElement | ItemSectionElement>
}

export type FormTextFieldProps = {
  autoFocus?: boolean
  defaultValue?: string
  error?: string
  placeholder?: string
  title?: string
  value?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  className?: string
}

export type FormMultiSelectProps = {
  autoFocus?: boolean
  error?: string
  placeholder?: string
  title?: string
  hasSelectedItems?: boolean
  className?: string
  children?: FormMultiSelectItemElement | Iterable<FormMultiSelectItemElement>
}

export type FormMultiSelectItemProps = {
  onSelect?: () => void
  onDeselect?: () => void
  title: string
  subtitle?: string
  keywords?: string[]
  accessories?: ReactNode
  className?: string
}

export type FormProps = {
  navigationTitle: string
  actions: ActionPanelElement
  className?: string
  children?:
    | FormTextFieldElement
    | FormMultiSelectElement
    | Iterable<FormTextFieldElement | FormMultiSelectElement>
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

type FormTextFieldElement = ReactElement<FormTextFieldProps>

type FormMultiSelectElement = ReactElement<FormMultiSelectProps>

type FormMultiSelectItemElement = ReactElement<FormMultiSelectItemProps>

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
