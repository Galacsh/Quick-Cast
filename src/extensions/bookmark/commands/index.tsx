import { FileHeart } from 'lucide-react'
import manageBookmarks from './manage-bookmarks'
import manageBookmarkFolders from './manage-bookmark-folders'
import { bookmark as request } from '@/extensions/actions'
import type { Command } from '@/cast/types'

export default [
  manageBookmarks,
  manageBookmarkFolders,
  {
    icon: FileHeart,
    name: 'Open Bookmarks Page',
    mode: 'no-view',
    action: request.openBookmarksPage,
  },
] satisfies Command[]
