import { useCallback, useContext } from 'react'
import { SearchContext } from '@/cast/contexts'

export function useSearch() {
  const context = useContext(SearchContext)

  if (context == null) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  const { search, setSearch } = context

  const clear = useCallback(() => {
    setSearch('')
  }, [setSearch])

  return {
    search,
    setSearch,
    clear,
  }
}
