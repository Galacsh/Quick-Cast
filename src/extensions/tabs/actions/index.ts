import { payloadRequester } from '@/extensions/utils'

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

export const requesters = {
  switchToTab: switchToTab.requester,
  closeTab: closeTab.requester,
  toggleBookmark: toggleBookmark.requester,
}

export const handlers = {
  [switchToTab.id]: switchToTab.handler,
  [closeTab.id]: closeTab.handler,
  [toggleBookmark.id]: toggleBookmark.handler,
}
