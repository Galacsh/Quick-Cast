import { FileClock } from 'lucide-react'
import manageHistories from './manage-histories'
import { history as request } from '@/extensions/actions'
import type { Command } from '@/cast/types'

export default [
  manageHistories,
  {
    icon: FileClock,
    name: 'Open History Page',
    mode: 'no-view',
    action: request.openHistoryPage,
  },
] satisfies Command[]
