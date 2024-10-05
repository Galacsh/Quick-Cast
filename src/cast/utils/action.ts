import type {
  ActionElement,
  ActionEssentials,
  ActionPanelElement,
  ActionPanelSectionElement,
} from '../types'

export function toActions(panel: ActionPanelElement): ActionEssentials[] {
  const panelChildren = panel.props.children
  if (!panelChildren) return []

  if (panelChildren == null) {
    return []
  } else if (Array.isArray(panelChildren)) {
    const children = panelChildren as Iterable<
      ActionElement | ActionPanelSectionElement | undefined
    >
    const actions = []
    for (const child of children) {
      if (child == null) continue
      actions.push(...fromElement(child))
    }
    return actions
  } else {
    const child = panelChildren as ActionElement | ActionPanelSectionElement
    return fromElement(child)
  }
}

function fromActionElement(elem: ActionElement): ActionEssentials {
  const { title, shortcut, onAction } = elem.props
  return { title, shortcut, onAction }
}

function fromActionElements(
  iterable: Iterable<ActionElement | undefined>
): ActionEssentials[] {
  const actions = []

  for (const elem of iterable) {
    if (elem == null) continue
    actions.push(fromActionElement(elem))
  }

  return actions
}

function fromSectionElement(
  sectionElem: ActionPanelSectionElement
): ActionEssentials[] {
  const children = sectionElem.props.children
  if (children == null) {
    return []
  } else if (Array.isArray(children)) {
    const iterable = children as Iterable<ActionElement | undefined>
    return fromActionElements(iterable)
  } else {
    const action = children as ActionElement
    return [fromActionElement(action)]
  }
}

function fromElement(
  elem: ActionElement | ActionPanelSectionElement
): ActionEssentials[] {
  if ('onAction' in elem.props) {
    const actionElement = elem as ActionElement
    return [fromActionElement(actionElement)]
  } else {
    const sectionElement = elem as ActionPanelSectionElement
    return fromSectionElement(sectionElement)
  }
}
