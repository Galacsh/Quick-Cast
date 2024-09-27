import { ReaderIcon } from '@radix-ui/react-icons'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: ReaderIcon,
  name: 'Manage tabs',
  mode: 'view',
  view: <Main />,
} satisfies Command
