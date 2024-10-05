import { HISTORY } from '@/extensions/actions/id'
import { payloadRequester, requester } from '@/extensions/actions/helper'
import type { History, TabGroup } from '@/types'

export const open = payloadRequester<{ history: History }>(HISTORY.OPEN)

/** > 'delete' is not allowed as a variable declaration name. */
export const deleteHistory = payloadRequester<{ history: History }>(
  HISTORY.DELETE
)

export const openInGroup = payloadRequester<{
  history: History
  tabGroup: TabGroup
}>(HISTORY.OPEN_IN_GROUP)

export const openHistoryPage = requester(HISTORY.OPEN_HISTORY_PAGE)
