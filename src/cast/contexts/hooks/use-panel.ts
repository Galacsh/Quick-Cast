import { useContext } from 'react'
import { PanelContext } from '@/cast/contexts'

export function usePanel() {
  const context = useContext(PanelContext)

  if (context == null) {
    throw new Error('usePanel must be used within a PanelProvider')
  }

  const { isPanelOpen, setPanelOpen, content, setContent } = context

  return {
    isPanelOpen,
    setPanelOpen,
    content,
    setContent,
  }
}
