import { History } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: History,
  name: 'Manage Histories',
  mode: 'view',
  view: <Main />,
} satisfies Command
