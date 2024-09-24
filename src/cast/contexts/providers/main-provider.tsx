import { createContext, useRef, type ReactNode, type RefObject } from 'react'

type MainProviderState = {
  mainRef: RefObject<HTMLDivElement>
}

export const MainContext = createContext<MainProviderState | undefined>(
  undefined
)

export function MainProvider(props: { children?: ReactNode }) {
  const mainRef = useRef<HTMLInputElement>(null)

  return (
    <MainContext.Provider value={{ mainRef }}>
      {props.children}
    </MainContext.Provider>
  )
}
