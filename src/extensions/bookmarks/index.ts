import { BookmarkIcon } from '@radix-ui/react-icons'
import commands from './commands'
import type { Extension } from '@/cast/types'

export const extension: Extension = {
  name: 'Bookmarks',
  icon: BookmarkIcon,
  commands,
}

export { requesters, handlers } from './actions'
