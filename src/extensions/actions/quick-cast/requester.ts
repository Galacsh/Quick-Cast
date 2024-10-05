import { QUICK_CAST } from '@/extensions/actions/id'
import { requester } from '@/extensions/actions/helper'

export const reload = requester(QUICK_CAST.RELOAD)

export const openOptionsPage = requester(QUICK_CAST.OPEN_OPTIONS_PAGE)
