import {
  createContext,
  useState,
  useRef,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
} from 'react'

type NavigationProviderState = {
  view: ReactNode
  setView: Dispatch<SetStateAction<ReactNode>>
  views: MutableRefObject<ReactNode[]>
  onViewPops: MutableRefObject<(() => void)[]>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

export const NavigationContext = createContext<
  NavigationProviderState | undefined
>(undefined)

export function NavigationProvider(props: {
  home: ReactNode
  children?: ReactNode
}) {
  const [view, setView] = useState<ReactNode>(props.home)
  const [title, setTitle] = useState<string>('Quick Cast')

  const views = useRef<ReactNode[]>([props.home])
  const onViewPops = useRef<(() => void)[]>([() => window.close()])

  return (
    <NavigationContext.Provider
      value={{
        view,
        setView,
        views,
        onViewPops,
        title,
        setTitle,
      }}>
      {props.children}
    </NavigationContext.Provider>
  )
}
