import { BookmarkIcon } from '@radix-ui/react-icons'
import commands from './commands'
import type { Extension } from '@/cast/types'

export const extension: Extension = {
  name: 'Bookmark',
  icon: BookmarkIcon,
  commands,
}
