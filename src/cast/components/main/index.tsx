import { useEffect } from 'react'
import { useMain, usePanel, useSearch, useNavigation } from '@/cast/contexts'
import { cn } from '@/lib/utils'

export default function Main() {
  const { ref } = useMain()
  const { view, pop, isRoot } = useNavigation()
  const { search, clear } = useSearch()
  const { isPanelOpen } = usePanel()

  useEffect(() => {
    function previous(e: KeyboardEvent) {
      if (isPanelOpen) return

      if (e.key === 'Backspace' && search === '' && !isRoot()) {
        e.preventDefault()
        pop()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        if (search === '') pop()
        else clear()
      }
    }

    window.addEventListener('keydown', previous)
    return () => window.removeEventListener('keydown', previous)
  }, [clear, isPanelOpen, isRoot, pop, search])

  return (
    <div
      ref={ref}
      className={cn(
        'w-cmdk max-w-full h-cmdk-body max-h-cmdk-body',
        'overflow-hidden'
      )}>
      {view}
    </div>
  )
}
