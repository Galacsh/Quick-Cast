import { extension as tabExtension } from './tab'
import { extension as historyExtension } from './history'
import { extension as bookmarkExtension } from './bookmark'
import { extension as quickCast } from './quick-cast'
import type { Extension } from '@/cast/types'

export const extensions: Extension[] = [
  tabExtension,
  bookmarkExtension,
  historyExtension,
  quickCast,
]
