import { payloadRequester } from '@/extensions/utils'
import type { TabGroup } from '@/types'

const switchToTab = payloadRequester<{ tabId: number }>(
  'switch-to-tab',
  async ({ tabId }) => {
    await chrome.tabs.update(tabId, { muted: false, active: true })
  }
)

const closeTab = payloadRequester<{ tabId: number }>(
  'close-tab',
  async ({ tabId }) => {
    await chrome.tabs.remove(tabId)
  }
)

const toggleBookmark = payloadRequester<{ tabId: number }>(
  'toggle-bookmark',
  async ({ tabId }) => {
    const tab = await chrome.tabs.get(tabId)
    if (tab.url == null) throw new Error("Tab's URL doen't exist.")

    const found = await chrome.bookmarks.search({ url: tab.url })
    if (found.length > 0) {
      await Promise.all(
        found.map((bookmark) => chrome.bookmarks.remove(bookmark.id))
      )
    } else {
      await chrome.bookmarks.create({ title: tab.title, url: tab.url })
    }
  }
)

// =====================================================================

const toggleCollapseGroup = payloadRequester<{ tabGroup: TabGroup }>(
  'toggle-collapse-group',
  async ({ tabGroup }) => {
    const { id, collapsed } = tabGroup
    await chrome.tabGroups.update(id, { collapsed: !collapsed })
  }
)

const closeTabGroup = payloadRequester<{ tabGroup: TabGroup }>(
  'close-tab-group',
  async ({ tabGroup }) => {
    const tabs = await chrome.tabs.query({ groupId: tabGroup.id })
    const ids = tabs.map((tab) => tab.id).filter((id) => id != null)
    await chrome.tabs.remove(ids)
  }
)

export const requesters = {
  // Tab
  switchToTab: switchToTab.requester,
  closeTab: closeTab.requester,
  toggleBookmark: toggleBookmark.requester,
  // Tab Group
  toggleCollapseGroup: toggleCollapseGroup.requester,
  closeTabGroup: closeTabGroup.requester,
}

export const handlers = {
  // Tab
  [switchToTab.id]: switchToTab.handler,
  [closeTab.id]: closeTab.handler,
  [toggleBookmark.id]: toggleBookmark.handler,
  // Tab Group
  [toggleCollapseGroup.id]: toggleCollapseGroup.handler,
  [closeTabGroup.id]: closeTabGroup.handler,
}
