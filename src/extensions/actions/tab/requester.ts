import { TAB } from '@/extensions/actions/id'
import { payloadRequester, requester } from '@/extensions/actions/helper'
import type { Tab, TabGroup } from '@/types'

export const switchTo = payloadRequester<{ tab: Tab }>(TAB.SWITCH_TO)

export const close = payloadRequester<{ tab: Tab }>(TAB.CLOSE)

export const toggleBookmark = payloadRequester<{ tab: Tab }>(
  TAB.TOGGLE_BOOKMARK
)

export const togglePin = payloadRequester<{ tab: Tab }>(TAB.TOGGLE_PIN)

export const create = requester(TAB.CREATE)

export const removeFromGroup = payloadRequester<{ tab: Tab }>(
  TAB.REMOVE_FROM_GROUP
)

export const moveToGroup = payloadRequester<{ tab: Tab; tabGroup: TabGroup }>(
  TAB.MOVE_TO_GROUP
)

// =====================================================================

export const toggleCollapseGroup = payloadRequester<{ tabGroup: TabGroup }>(
  TAB.TOGGLE_COLLAPSE_GROUP
)

export const closeGroup = payloadRequester<{ tabGroup: TabGroup }>(
  TAB.CLOSE_GROUP
)

export const createGroup = payloadRequester<{ title: string; tabs: Tab[] }>(
  TAB.CREATE_GROUP
)

export const editGroupName = payloadRequester<{
  title: string
  tabGroup: TabGroup
}>(TAB.CREATE_GROUP)

export const excludeTabs = payloadRequester<{ tabs: Tab[] }>(TAB.EXCLUDE_TABS)
