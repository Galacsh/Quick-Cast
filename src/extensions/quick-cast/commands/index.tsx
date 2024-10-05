import { RefreshCw, Settings } from 'lucide-react'
import { quickCast as request } from '@/extensions/actions'
import type { Command } from '@/cast/types'

export default [
  {
    icon: RefreshCw,
    name: 'Reload Quick Cast',
    mode: 'no-view',
    action: request.reload,
  },
  {
    icon: Settings,
    name: 'Open Options Page',
    mode: 'no-view',
    action: request.openOptionsPage,
  },
] satisfies Command[]
