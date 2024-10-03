import { CubeIcon } from '@radix-ui/react-icons'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: CubeIcon,
  name: 'Manage Bookmark Folders',
  mode: 'view',
  view: <Main />,
} satisfies Command
