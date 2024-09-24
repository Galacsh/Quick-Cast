import {
  createContext,
  useState,
  useRef,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type RefObject,
} from 'react'

type SearchProviderState = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  ref: RefObject<HTMLInputElement>
}

export const SearchContext = createContext<SearchProviderState | undefined>(
  undefined
)

export function SearchProvider(props: { children?: ReactNode }) {
  const [search, setSearch] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  return (
    <SearchContext.Provider value={{ search, setSearch, ref }}>
      {props.children}
    </SearchContext.Provider>
  )
}
