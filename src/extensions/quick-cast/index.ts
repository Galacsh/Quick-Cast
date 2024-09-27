import { GearIcon } from '@radix-ui/react-icons'
import commands from './commands'
import type { Extension } from '@/cast/types'

export const extension: Extension = {
  name: 'Quick Cast',
  icon: GearIcon,
  commands,
}

export { requesters, handlers } from './actions'
