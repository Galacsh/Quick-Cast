import { BOOKMARK } from '@/extensions/actions/id'
import { getBookmarks } from './utils'
import type {
  create,
  createFolder,
  deleteBookmark,
  deleteFolder,
  edit,
  editFolder,
  move,
  moveToFolder,
  open,
  openBookmarksPage,
  openFolder,
  openFolderAsGroup,
  openFolderInGroup,
  openInGroup,
} from './requester'

const onOpen: typeof open = async ({ bookmark }) => {
  const { url } = bookmark
  if (url == null) throw new Error('URL is empty.')

  await chrome.tabs.create({ url, active: true })
}

const onOpenInGroup: typeof openInGroup = async ({ bookmark, tabGroup }) => {
  const { url } = bookmark
  const { id: groupId } = tabGroup
  if (url == null) throw new Error('URL is empty.')

  const tab = await chrome.tabs.create({ url, active: false })
  if (tab.id == null) throw new Error('Created tab has no id.')

  await chrome.tabs.group({ groupId, tabIds: tab.id })
  await chrome.tabs.update(tab.id, { active: true, muted: false })
}

const onCreate: typeof create = async ({ title, url }) => {
  const roots = await chrome.bookmarks.getChildren('0')

  const first = roots.find(({ index }) => index === 0)
  if (first == null) throw new Error('Cannot find bookmark tree.')
  const { id: parentId } = first

  await chrome.bookmarks.create({ title, url, parentId })
}

const onDelete: typeof deleteBookmark = async ({ bookmark }) => {
  await chrome.bookmarks.remove(bookmark.id)
}

const onEdit: typeof edit = async ({ bookmark }) => {
  const { id, title, url } = bookmark
  if (url == null) throw new Error('URL is empty.')

  await chrome.bookmarks.update(id, { title, url })
}

const onOpenFolder: typeof openFolder = async ({ folder }) => {
  const { id } = folder
  if (folder.children == null) {
    throw new Error('Has no children.')
  }

  const tree = await chrome.bookmarks.getSubTree(id)
  const bookmarks = getBookmarks(tree)
  const tabs = await Promise.all(
    bookmarks
      .map(({ url }) => url)
      .filter((url) => url != null)
      .map((url) => chrome.tabs.create({ url, active: false }))
  )

  const first = tabs.at(0)
  if (first) {
    if (first.id == null) {
      throw new Error('First tab has no id.')
    }

    await chrome.tabs.update(first.id, { active: true, muted: false })
  }
}

const onOpenFolderInGroup: typeof openFolderInGroup = async ({
  folder,
  tabGroup,
}) => {
  const { id } = folder
  const { id: groupId } = tabGroup
  if (folder.children == null) {
    throw new Error('Has no children.')
  }

  const tree = await chrome.bookmarks.getSubTree(id)
  const bookmarks = getBookmarks(tree)
  const tabs = await Promise.all(
    bookmarks
      .map(({ url }) => url)
      .filter((url) => url != null)
      .map((url) => chrome.tabs.create({ url, active: false }))
  )

  const tabIds = tabs.map(({ id }) => id).filter((id) => id != null)
  await chrome.tabs.group({ groupId, tabIds })

  const first = tabs.at(0)
  if (first) {
    if (first.id == null) {
      throw new Error('First tab has no id.')
    }

    await chrome.tabs.update(first.id, { active: true, muted: false })
  }
}

const onOpenFolderAsGroup: typeof openFolderAsGroup = async ({
  folder,
  title,
}) => {
  const { id } = folder
  if (folder.children == null) {
    throw new Error('Has no children.')
  }

  const tree = await chrome.bookmarks.getSubTree(id)
  const bookmarks = getBookmarks(tree)
  const tabs = await Promise.all(
    bookmarks
      .map(({ url }) => url)
      .filter((url) => url != null)
      .map((url) => chrome.tabs.create({ url, active: false }))
  )

  const tabIds = tabs.map(({ id }) => id).filter((id) => id != null)
  const groupId = await chrome.tabs.group({ tabIds })
  await chrome.tabGroups.update(groupId, { title })

  const first = tabs.at(0)
  if (first) {
    if (first.id == null) {
      throw new Error('First tab has no id.')
    }

    await chrome.tabs.update(first.id, { active: true, muted: false })
  }
}

const onCreateFolder: typeof createFolder = async ({ title }) => {
  const roots = await chrome.bookmarks.getChildren('0')

  const first = roots.find(({ index }) => index === 0)
  if (first == null) throw new Error('Cannot find bookmark tree.')
  const { id: parentId } = first

  await chrome.bookmarks.create({ title, parentId })
}

const onDeleteFolder: typeof deleteFolder = async ({ folder }) => {
  const { id } = folder
  if (folder.children == null) {
    throw new Error('Has no children.')
  }

  await chrome.bookmarks.removeTree(id)
}

const onEditFolder: typeof editFolder = async ({ folder }) => {
  const { id, title } = folder
  await chrome.bookmarks.update(id, { title })
}

const onOpenBookmarksPage: typeof openBookmarksPage = async () => {
  await chrome.tabs.create({
    url: 'chrome://bookmarks',
    active: true,
  })
}

const onMoveToFolder: typeof moveToFolder = async ({ node, folder }) => {
  const { id } = node
  const { id: parentId } = folder
  await chrome.bookmarks.move(id, { parentId })
}

const onMove: typeof move = async ({ bookmark }) => {
  const { id, parentId, index } = bookmark
  await chrome.bookmarks.move(id, { parentId, index })
}

export default {
  [BOOKMARK.OPEN]: onOpen,
  [BOOKMARK.OPEN_IN_GROUP]: onOpenInGroup,
  [BOOKMARK.CREATE]: onCreate,
  [BOOKMARK.DELETE]: onDelete,
  [BOOKMARK.EDIT]: onEdit,
  [BOOKMARK.MOVE]: onMove,
  [BOOKMARK.MOVE_FOLDER]: onMoveToFolder,
  [BOOKMARK.FOLDER_OPEN]: onOpenFolder,
  [BOOKMARK.FOLDER_OPEN_IN_GROUP]: onOpenFolderInGroup,
  [BOOKMARK.FOLDER_OPEN_AS_GROUP]: onOpenFolderAsGroup,
  [BOOKMARK.FOLDER_CREATE]: onCreateFolder,
  [BOOKMARK.FOLDER_DELETE]: onDeleteFolder,
  [BOOKMARK.FOLDER_EDIT]: onEditFolder,
  [BOOKMARK.OPEN_BOOKMARKS_PAGE]: onOpenBookmarksPage,
}
