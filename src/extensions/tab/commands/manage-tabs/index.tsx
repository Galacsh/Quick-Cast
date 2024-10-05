import { FileText } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: FileText,
  name: 'Manage Tabs',
  mode: 'view',
  view: <Main />,
} satisfies Command
