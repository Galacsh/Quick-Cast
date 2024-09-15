import { useContext } from 'react'
import { QuickCastContext } from '@/components/quick-cast-provider'

export function useSearch() {
  const context = useContext(QuickCastContext)

  if (context == null) {
    throw new Error('useSearch must be used within a QuickCastProvider')
  }

  const { searchRef } = context

  return {
    ref: searchRef,
    focus: () => {
      searchRef.current?.focus()
    },
  }
}
