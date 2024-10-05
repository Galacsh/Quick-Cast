import { ArchiveIcon } from '@radix-ui/react-icons'
import commands from './commands'
import type { Extension } from '@/cast/types'

export const extension: Extension = {
  name: 'History',
  icon: ArchiveIcon,
  commands,
}
