import { FilePlus } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: FilePlus,
  name: 'Create Tab Group',
  mode: 'view',
  view: <Main />,
} satisfies Command
