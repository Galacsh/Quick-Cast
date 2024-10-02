import { GearIcon } from '@radix-ui/react-icons'
import { requesters } from '../actions'
import type { Command } from '@/cast/types'

export default [
  {
    icon: GearIcon,
    name: 'Reload Quick Cast',
    mode: 'no-view',
    action: requesters.reloadQuickCast,
  },
  {
    icon: GearIcon,
    name: 'Open Options Page',
    mode: 'no-view',
    action: requesters.openQuickCastOptionsPage,
  },
] satisfies Command[]
