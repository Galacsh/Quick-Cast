import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

type SearchProviderState = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<SearchProviderState | undefined>(
  undefined
)

export function SearchProvider(props: { children?: ReactNode }) {
  const [search, setSearch] = useState<string>('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  )
}
