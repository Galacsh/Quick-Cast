import {
  createContext,
  useState,
  useRef,
  createRef,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  type RefObject,
} from 'react'

type QuickCastProviderState = {
  view: ReactNode
  setView: Dispatch<SetStateAction<ReactNode>>
  views: MutableRefObject<ReactNode[]>
  onViewPops: MutableRefObject<(() => void)[]>
  searchRef: RefObject<HTMLInputElement>
  bodyRef: RefObject<HTMLDivElement>
}

const initialState: QuickCastProviderState = {
  view: <>No view found.</>,
  setView: () => {},
  views: { current: [] },
  onViewPops: { current: [] },
  bodyRef: createRef<HTMLDivElement>(),
  searchRef: createRef<HTMLInputElement>(),
}

export const QuickCastContext = createContext(initialState)

export function QuickCastProvider(props: {
  home: ReactNode
  children: ReactNode
}) {
  const views = useRef<ReactNode[]>([props.home])
  const onViewPops = useRef<(() => void)[]>([() => {}])
  const [view, setView] = useState<ReactNode>(props.home)
  const bodyRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <QuickCastContext.Provider
      value={{
        view,
        setView,
        onViewPops,
        views,
        bodyRef,
        searchRef,
      }}>
      {props.children}
    </QuickCastContext.Provider>
  )
}
