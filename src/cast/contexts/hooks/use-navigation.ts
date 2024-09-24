import { useCallback, useContext, type ReactNode } from 'react'
import { NavigationContext } from '@/cast/contexts'

export function useNavigation() {
  const context = useContext(NavigationContext)

  if (context == null) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }

  const { view, setView, views, onViewPops, title, setTitle } = context

  /**
   * Push view(component) to the view stack(`views`) and show the pushed view
   */
  const push = useCallback(
    (component: ReactNode, onViewPop?: () => void) => {
      views.current.push(component)
      onViewPops.current.push(onViewPop || (() => {}))
      setView(component)
    },
    [onViewPops, setView, views]
  )

  /**
   * Pop current view and show previous view.
   * When pop, registered onPop function will be called.
   */
  const pop = useCallback(() => {
    views.current.pop()

    const onPop = onViewPops.current.pop()
    if (onPop != null) {
      onPop()
    }

    if (views.current.length > 0) {
      setView(views.current[views.current.length - 1])
    }
  }, [onViewPops, setView, views])

  /**
   * Show root view and run registered onPop callbacks
   */
  const popToRoot = useCallback(() => {
    for (let i = onViewPops.current.length - 1; i >= 1; i--) {
      const onPop = onViewPops.current[i]
      onPop()
    }
    onViewPops.current = [onViewPops.current[0]]

    setView(views.current[0])
    views.current = [views.current[0]]
  }, [onViewPops, setView, views])

  /**
   * Returns true if current view is root view
   */
  const isRoot = useCallback(() => views.current.length === 1, [views])

  return {
    view,
    push,
    pop,
    popToRoot,
    isRoot,
    title,
    setTitle,
  }
}
