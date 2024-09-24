import { useCallback, useContext } from 'react'
import { MainContext } from '@/cast/contexts'

export function useMain() {
  const context = useContext(MainContext)

  if (context == null) {
    throw new Error('useMain must be used within a MainProvider')
  }

  const { mainRef } = context

  const disableScrolling = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.style.overflow = 'hidden'
    }
  }, [mainRef])

  const enableScrolling = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.style.overflow = ''
    }
  }, [mainRef])

  return {
    ref: mainRef,
    disableScrolling,
    enableScrolling,
  }
}
