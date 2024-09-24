import { useContext } from 'react'
import { ActionContext } from '@/cast/contexts'

export function useActions() {
  const context = useContext(ActionContext)

  if (context == null) {
    throw new Error('useActions must be used within a ActionProvider')
  }

  const { actions, setActions } = context
  const defaultAction = actions.find((action) => action.isDefault)

  return {
    actions,
    setActions,
    defaultAction,
  }
}
