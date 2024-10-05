import { GearIcon } from '@radix-ui/react-icons'
import { quickCast as request } from '@/extensions/actions'
import type { Command } from '@/cast/types'

export default [
  {
    icon: GearIcon,
    name: 'Reload Quick Cast',
    mode: 'no-view',
    action: request.reload,
  },
  {
    icon: GearIcon,
    name: 'Open Options Page',
    mode: 'no-view',
    action: request.openOptionsPage,
  },
] satisfies Command[]
