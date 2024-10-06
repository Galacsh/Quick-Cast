import { FolderPlus } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: FolderPlus,
  name: 'Create Bookmark Folder',
  mode: 'view',
  view: <Main />,
} satisfies Command
