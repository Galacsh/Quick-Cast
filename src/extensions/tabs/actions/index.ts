import { payloadRequester, requester } from '@/extensions/utils'
import type { Tab, TabGroup } from '@/types'

const switchToTab = payloadRequester<{ tabId: number }>(
  'tab-switch',
  async ({ tabId }) => {
    await chrome.tabs.update(tabId, { muted: false, active: true })
  }
)

const closeTab = payloadRequester<{ tabId: number }>(
  'tab-close',
  async ({ tabId }) => {
    await chrome.tabs.remove(tabId)
  }
)

const toggleBookmark = payloadRequester<{ tabId: number }>(
  'tab-toggle-bookmark',
  async ({ tabId }) => {
    const tab = await chrome.tabs.get(tabId)
    if (tab.url == null) throw new Error("Tab's URL doen't exist.")

    const found = await chrome.bookmarks.search({ url: tab.url })
    if (found.length > 0) {
      await Promise.all(
        found.map((bookmark) => chrome.bookmarks.remove(bookmark.id))
      )
    } else {
      const roots = await chrome.bookmarks.getChildren('0')
      const first = roots.find((r) => r.index === 0)
      if (first == null) throw new Error('Cannot find bookmark tree.')

      await chrome.bookmarks.create({
        title: tab.title,
        url: tab.url,
        parentId: first.id,
      })
    }
  }
)

const togglePin = payloadRequester<{ tab: Tab }>(
  'tab-toggle-pin',
  async ({ tab }) => {
    if (tab.id == null) return
    await chrome.tabs.update(tab.id, { pinned: !tab.pinned })
  }
)

const createTab = requester('tab-create', async () => {
  await chrome.tabs.create({})
})

const removeFromGroup = payloadRequester<{ tab: Tab }>(
  'tab-remove-from-group',
  async ({ tab }) => {
    if (tab.id == null) return
    await chrome.tabs.ungroup(tab.id)
  }
)

const moveToGroup = payloadRequester<{ tab: Tab; tabGroup: TabGroup }>(
  'tab-move-to-group',
  async ({ tab, tabGroup }) => {
    if (tab.id == null || tabGroup.id == null) return
    await chrome.tabs.group({ groupId: tabGroup.id, tabIds: tab.id })
  }
)

// =====================================================================

const toggleCollapseGroup = payloadRequester<{ tabGroup: TabGroup }>(
  'tab-group-toggle-collapse',
  async ({ tabGroup }) => {
    const { id, collapsed } = tabGroup
    await chrome.tabGroups.update(id, { collapsed: !collapsed })
  }
)

const closeTabGroup = payloadRequester<{ tabGroup: TabGroup }>(
  'tab-group-close',
  async ({ tabGroup }) => {
    const tabs = await chrome.tabs.query({ groupId: tabGroup.id })
    const ids = tabs.map((tab) => tab.id).filter((id) => id != null)
    await chrome.tabs.remove(ids)
  }
)

const createTabGroup = payloadRequester<{ name: string; tabs: Tab[] }>(
  'tab-group-create',
  async ({ name, tabs }) => {
    const groupId = await chrome.tabs.group({
      tabIds: tabs.map((tab) => tab.id).filter((id) => id != null),
    })

    await chrome.tabGroups.update(groupId, { title: name })
  }
)

const editTabGroupName = payloadRequester<{ name: string; tabGroup: TabGroup }>(
  'tab-group-create',
  async ({ name, tabGroup }) => {
    await chrome.tabGroups.update(tabGroup.id, { title: name })
  }
)

const excludeTabs = payloadRequester<{ tabs: Tab[] }>(
  'tab-group-exclude',
  async ({ tabs }) => {
    await chrome.tabs.ungroup(tabs.map((t) => t.id).filter((id) => id != null))
  }
)

export const requesters = {
  // Tab
  switchToTab: switchToTab.requester,
  closeTab: closeTab.requester,
  toggleBookmark: toggleBookmark.requester,
  togglePin: togglePin.requester,
  createTab: createTab.requester,
  removeFromGroup: removeFromGroup.requester,
  moveToGroup: moveToGroup.requester,
  // Tab Group
  toggleCollapseGroup: toggleCollapseGroup.requester,
  closeTabGroup: closeTabGroup.requester,
  createTabGroup: createTabGroup.requester,
  editTabGroupName: editTabGroupName.requester,
  excludeTabs: excludeTabs.requester,
}

export const handlers = {
  // Tab
  [switchToTab.id]: switchToTab.handler,
  [closeTab.id]: closeTab.handler,
  [toggleBookmark.id]: toggleBookmark.handler,
  [togglePin.id]: togglePin.handler,
  [createTab.id]: createTab.handler,
  [removeFromGroup.id]: removeFromGroup.handler,
  [moveToGroup.id]: moveToGroup.handler,
  // Tab Group
  [toggleCollapseGroup.id]: toggleCollapseGroup.handler,
  [closeTabGroup.id]: closeTabGroup.handler,
  [createTabGroup.id]: createTabGroup.handler,
  [editTabGroupName.id]: editTabGroupName.handler,
  [excludeTabs.id]: excludeTabs.handler,
}
