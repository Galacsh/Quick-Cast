import { BookmarkPlus } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: BookmarkPlus,
  name: 'Create Bookmark',
  mode: 'view',
  view: <Main />,
} satisfies Command
