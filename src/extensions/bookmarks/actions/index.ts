import { payloadRequester } from '@/extensions/utils'
import type { BookmarkNode, TabGroup } from '@/types'

function toItems(tree: BookmarkNode[]): BookmarkNode[] {
  const result: BookmarkNode[] = []

  function traverse(node: BookmarkNode) {
    // If the node has a URL, it's a bookmark item
    if (node.url) {
      result.push(node)
    }

    // If the node has children, recursively traverse them
    if (node.children) {
      node.children.forEach(traverse)
    }
  }

  // Start the traversal from the root of the tree
  tree.forEach(traverse)

  return result
}

const openBookmark = payloadRequester<{ bookmark: BookmarkNode }>(
  'bookmark-open',
  async ({ bookmark }) => {
    if (bookmark.children != null) {
      const tree = await chrome.bookmarks.getSubTree(bookmark.id)
      const bookmarks = toItems(tree)
      const tabs = await Promise.all(
        bookmarks.map((bookmark) =>
          chrome.tabs.create({ url: bookmark.url, active: false })
        )
      )

      const first = tabs.at(0)
      if (first) {
        if (first.id == null) {
          throw new Error('Cannot find id of the created tab.')
        }

        await chrome.tabs.update(first.id, { muted: false, active: true })
      }
    } else {
      await chrome.tabs.create({ url: bookmark.url, active: true })
    }
  }
)

const openInGroup = payloadRequester<{
  bookmark: BookmarkNode
  tabGroup: TabGroup
}>('bookmark-open-in-group', async ({ bookmark, tabGroup }) => {
  if (bookmark.children != null) {
    const tree = await chrome.bookmarks.getSubTree(bookmark.id)
    const bookmarks = toItems(tree)
    const tabs = await Promise.all(
      bookmarks.map((bookmark) =>
        chrome.tabs.create({ url: bookmark.url, active: false })
      )
    )

    const tabIds = tabs.map((t) => t.id).filter((id) => id != null)
    await chrome.tabs.group({ groupId: tabGroup.id, tabIds })

    const first = tabs.at(0)
    if (first) {
      if (first.id == null) {
        throw new Error('Cannot find id of the created tab.')
      }

      await chrome.tabs.update(first.id, { muted: false, active: true })
    }
  } else {
    const tab = await chrome.tabs.create({ url: bookmark.url, active: false })
    if (tab.id == null) throw new Error('Cannot find id of the created tab.')
    await chrome.tabs.group({ groupId: tabGroup.id, tabIds: tab.id })
    await chrome.tabs.update(tab.id, { muted: false, active: true })
  }
})

const openAsGroup = payloadRequester<{
  bookmark: BookmarkNode
  title: string
}>('bookmark-open-as-group', async ({ bookmark, title }) => {
  if (bookmark.children != null) {
    const tree = await chrome.bookmarks.getSubTree(bookmark.id)
    const bookmarks = toItems(tree)
    const tabs = await Promise.all(
      bookmarks.map((bookmark) =>
        chrome.tabs.create({ url: bookmark.url, active: false })
      )
    )

    const tabIds = tabs.map((t) => t.id).filter((id) => id != null)
    const groupId = await chrome.tabs.group({ tabIds })
    await chrome.tabGroups.update(groupId, { title })

    const first = tabs.at(0)
    if (first) {
      if (first.id == null) {
        throw new Error('Cannot find id of the created tab.')
      }

      await chrome.tabs.update(first.id, { muted: false, active: true })
    }
  } else {
    const tab = await chrome.tabs.create({ url: bookmark.url, active: false })
    if (tab.id == null) throw new Error('Cannot find id of the created tab.')
    const groupId = await chrome.tabs.group({ tabIds: tab.id })
    await chrome.tabGroups.update(groupId, { title })
    await chrome.tabs.update(tab.id, { muted: false, active: true })
  }
})

const removeBookmark = payloadRequester<{ bookmark: BookmarkNode }>(
  'bookmark-remove',
  async ({ bookmark }) => {
    if (bookmark.children != null) {
      await chrome.bookmarks.removeTree(bookmark.id)
    } else {
      await chrome.bookmarks.remove(bookmark.id)
    }
  }
)

const editBookmark = payloadRequester<{ bookmark: BookmarkNode }>(
  'bookmark-edit',
  async ({ bookmark }) => {
    const { id, title, url } = bookmark
    await chrome.bookmarks.update(id, { title, url })
  }
)

const editBookmarkFolder = payloadRequester<{
  folder: BookmarkNode
  title: string
}>('bookmark-edit-folder', async ({ folder, title }) => {
  const { id, url } = folder
  await chrome.bookmarks.update(id, { title, url })
})

export const requesters = {
  openBookmark: openBookmark.requester,
  removeBookmark: removeBookmark.requester,
  editBookmark: editBookmark.requester,
  editBookmarkFolder: editBookmarkFolder.requester,
  openInGroup: openInGroup.requester,
  openAsGroup: openAsGroup.requester,
}

export const handlers = {
  [openBookmark.id]: openBookmark.handler,
  [removeBookmark.id]: removeBookmark.handler,
  [editBookmark.id]: editBookmark.handler,
  [editBookmarkFolder.id]: editBookmarkFolder.handler,
  [openInGroup.id]: openInGroup.handler,
  [openAsGroup.id]: openAsGroup.handler,
}
