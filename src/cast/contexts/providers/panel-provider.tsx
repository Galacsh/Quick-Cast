import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { ActionPanelElement } from '@/cast/types'

type PanelProviderState = {
  isPanelOpen: boolean
  setPanelOpen: Dispatch<SetStateAction<boolean>>
  content: ActionPanelElement | undefined
  setContent: Dispatch<SetStateAction<ActionPanelElement | undefined>>
}

export const PanelContext = createContext<PanelProviderState | undefined>(
  undefined
)

export function PanelProvider(props: { children?: ReactNode }) {
  const [isPanelOpen, setPanelOpen] = useState<boolean>(false)
  const [content, setContent] = useState<ActionPanelElement>()

  return (
    <PanelContext.Provider
      value={{ isPanelOpen, setPanelOpen, content, setContent }}>
      {props.children}
    </PanelContext.Provider>
  )
}
