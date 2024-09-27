import { ReaderIcon } from '@radix-ui/react-icons'
import commands from './commands'
import type { Extension } from '@/cast/types'

export const extension: Extension = {
  name: 'Tabs',
  icon: ReaderIcon,
  commands,
}

export { requesters, handlers } from './actions'
