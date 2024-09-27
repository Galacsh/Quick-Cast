import { extension as tabsExtension, handlers as tabsHandlers } from './tabs'
import {
  extension as quickCast,
  handlers as quickCastHandlers,
} from './quick-cast'
import type { Extension } from '@/cast/types'

export const extensions: Extension[] = [tabsExtension, quickCast]
export const handlers = {
  ...tabsHandlers,
  ...quickCastHandlers,
}
