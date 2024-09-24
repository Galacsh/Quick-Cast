import { useCallback, useContext } from 'react'
import { SearchContext } from '@/cast/contexts'

export function useSearch() {
  const context = useContext(SearchContext)

  if (context == null) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  const { ref, search, setSearch } = context

  const focus = useCallback(() => {
    ref.current?.focus()
  }, [ref])

  const clear = useCallback(() => {
    setSearch('')
  }, [setSearch])

  return {
    ref,
    search,
    setSearch,
    focus,
    clear,
  }
}
