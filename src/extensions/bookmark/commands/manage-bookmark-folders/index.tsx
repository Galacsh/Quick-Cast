import { FolderHeart } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: FolderHeart,
  name: 'Manage Bookmark Folders',
  mode: 'view',
  view: <Main />,
} satisfies Command
