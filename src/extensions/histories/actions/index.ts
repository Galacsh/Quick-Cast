import { payloadRequester } from '@/extensions/utils'
import type { History, TabGroup } from '@/types'

const openHistory = payloadRequester<{ history: History }>(
  'history-open',
  async ({ history }) => {
    await chrome.tabs.create({ url: history.url, active: true })
  }
)

const removeHistory = payloadRequester<{ history: History }>(
  'history-remove',
  async ({ history }) => {
    if (history.url == null) return
    await chrome.history.deleteUrl({ url: history.url })
  }
)

const openInGroup = payloadRequester<{ history: History; tabGroup: TabGroup }>(
  'history-open-in-group',
  async ({ history, tabGroup }) => {
    if (history.url == null || tabGroup.id == null) return

    const tab = await chrome.tabs.create({ url: history.url, active: false })
    if (tab.id == null) throw new Error('Tab was not created.')

    await chrome.tabs.group({ groupId: tabGroup.id, tabIds: tab.id })
    await chrome.tabs.update(tab.id, { muted: false, active: true })
  }
)

export const requesters = {
  openHistory: openHistory.requester,
  removeHistory: removeHistory.requester,
  openInGroup: openInGroup.requester,
}

export const handlers = {
  [openHistory.id]: openHistory.handler,
  [removeHistory.id]: removeHistory.handler,
  [openInGroup.id]: openInGroup.handler,
}
