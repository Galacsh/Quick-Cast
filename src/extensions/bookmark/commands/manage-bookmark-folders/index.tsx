import { Folder } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: Folder,
  name: 'Manage Bookmark Folders',
  mode: 'view',
  view: <Main />,
} satisfies Command
