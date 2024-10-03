import {
  extension as quickCast,
  handlers as quickCastHandlers,
} from './quick-cast'
import { extension as tabsExtension, handlers as tabsHandlers } from './tabs'
import {
  extension as historiesExtension,
  handlers as historiesHandlers,
} from './histories'
import {
  extension as bookmarksExtension,
  handlers as bookmarksHandlers,
} from './bookmarks'
import type { Extension } from '@/cast/types'

export const extensions: Extension[] = [
  tabsExtension,
  bookmarksExtension,
  historiesExtension,
  quickCast,
]
export const handlers = {
  ...tabsHandlers,
  ...bookmarksHandlers,
  ...historiesHandlers,
  ...quickCastHandlers,
}
