import manageBookmarks from './manage-bookmarks'
import manageBookmarkFolders from './manage-bookmark-folders'
import type { Command } from '@/cast/types'

export default [manageBookmarks, manageBookmarkFolders] satisfies Command[]
