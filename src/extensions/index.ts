import { extension as quickCast } from './quick-cast'
import { extension as tabsExtension } from './tabs'
import { extension as historiesExtension } from './histories'
import { extension as bookmarksExtension } from './bookmarks'
import type { Extension } from '@/cast/types'

export const extensions: Extension[] = [
  tabsExtension,
  bookmarksExtension,
  historiesExtension,
  quickCast,
]
