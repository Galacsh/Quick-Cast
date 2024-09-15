import { QuickCastContext } from '@/components/quick-cast-provider'
import { useContext, type ReactNode } from 'react'

export function useNavigation() {
  const context = useContext(QuickCastContext)

  if (context == null) {
    throw new Error('useNavigation must be used within a QuickCastProvider')
  }

  const { view, setView, views, onViewPops } = context

  return {
    view,
    push: (component: ReactNode, onViewPop?: () => void) => {
      views.current.push(component)
      onViewPops.current.push(onViewPop || (() => {}))
      setView(component)
    },
    pop: () => {
      if (views.current.length === 1) return

      views.current.pop()
      const onPop = onViewPops.current.pop()

      setView(views.current[views.current.length - 1])
      if (onPop != null) onPop()
    },
    popToRoot: () => {
      setView(views.current[0])
      views.current = [views.current[0]]

      for (let i = onViewPops.current.length - 1; i >= 1; i--) {
        const onPop = onViewPops.current[i]
        onPop()
      }
      onViewPops.current = [onViewPops.current[0]]
    },
  }
}
