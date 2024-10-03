import { handlers as tabsHandlers } from './tabs/actions'
import { handlers as bookmarksHandlers } from './bookmarks/actions'
import { handlers as historiesHandlers } from './histories/actions'
import { handlers as quickCastHandlers } from './quick-cast/actions'

export const handlers = {
  ...tabsHandlers,
  ...bookmarksHandlers,
  ...historiesHandlers,
  ...quickCastHandlers,
}
