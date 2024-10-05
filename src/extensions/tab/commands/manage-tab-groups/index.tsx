import { FileStack } from 'lucide-react'
import Main from './main'
import type { Command } from '@/cast/types'

export default {
  icon: FileStack,
  name: 'Manage Tab Groups',
  mode: 'view',
  view: <Main />,
} satisfies Command
