import { Bookmark } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: Bookmark,
  name: 'Manage Bookmarks',
  mode: 'view',
  view: <Main />,
} satisfies Command
