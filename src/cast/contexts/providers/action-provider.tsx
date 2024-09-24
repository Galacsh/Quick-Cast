import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { ActionEssentials } from '@/cast/types'

type ActionProviderState = {
  actions: ActionEssentials[]
  setActions: Dispatch<SetStateAction<ActionEssentials[]>>
}

export const ActionContext = createContext<ActionProviderState | undefined>(
  undefined
)

export function ActionProvider(props: { children?: ReactNode }) {
  const [actions, setActions] = useState<ActionEssentials[]>([])

  return (
    <ActionContext.Provider value={{ actions, setActions }}>
      {props.children}
    </ActionContext.Provider>
  )
}
