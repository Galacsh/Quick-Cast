import { BOOKMARK } from '@/extensions/actions/id'
import { payloadRequester, requester } from '@/extensions/actions/helper'
import type { BookmarkNode, TabGroup } from '@/types'

export const open = payloadRequester<{ bookmark: BookmarkNode }>(BOOKMARK.OPEN)

export const openInGroup = payloadRequester<{
  bookmark: BookmarkNode
  tabGroup: TabGroup
}>(BOOKMARK.OPEN_IN_GROUP)

export const create = payloadRequester<{ title: string; url: string }>(
  BOOKMARK.CREATE
)

/** > 'delete' is not allowed as a variable declaration name. */
export const deleteBookmark = payloadRequester<{ bookmark: BookmarkNode }>(
  BOOKMARK.DELETE
)

export const edit = payloadRequester<{ bookmark: BookmarkNode }>(BOOKMARK.EDIT)

export const openFolder = payloadRequester<{ folder: BookmarkNode }>(
  BOOKMARK.OPEN
)

export const openFolderInGroup = payloadRequester<{
  folder: BookmarkNode
  tabGroup: TabGroup
}>(BOOKMARK.FOLDER_OPEN_AS_GROUP)

export const openFolderAsGroup = payloadRequester<{
  folder: BookmarkNode
  title: string
}>(BOOKMARK.FOLDER_OPEN_AS_GROUP)

export const deleteFolder = payloadRequester<{ folder: BookmarkNode }>(
  BOOKMARK.FOLDER_DELETE
)

export const editFolder = payloadRequester<{
  folder: BookmarkNode
}>(BOOKMARK.FOLDER_EDIT)

export const moveToFolder = payloadRequester<{
  node: BookmarkNode
  folder: BookmarkNode
}>(BOOKMARK.MOVE_FOLDER)

export const move = payloadRequester<{ bookmark: BookmarkNode }>(BOOKMARK.MOVE)

export const openBookmarksPage = requester(BOOKMARK.OPEN_BOOKMARKS_PAGE)
