import { useContext } from 'react'
import { QuickCastContext } from '@/components/quick-cast-provider'

export function useBody() {
  const context = useContext(QuickCastContext)

  if (context == null) {
    throw new Error('useBody must be used within a QuickCastProvider')
  }

  const { bodyRef } = context

  return {
    ref: bodyRef,
    disableScrolling: () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = 'hidden'
      }
    },
    enableScrolling: () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = ''
      }
    },
  }
}
