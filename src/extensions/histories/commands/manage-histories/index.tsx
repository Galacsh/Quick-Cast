import { ArchiveIcon } from '@radix-ui/react-icons'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: ArchiveIcon,
  name: 'Manage Histories',
  mode: 'view',
  view: <Main />,
} satisfies Command
