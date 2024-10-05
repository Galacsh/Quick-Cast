import { QUICK_CAST } from '@/extensions/actions/id'
import type { openOptionsPage, reload } from './requester'

const onReload: typeof reload = async () => {
  await chrome.runtime.reload()
}

const onOpenOptionsPage: typeof openOptionsPage = async () => {
  await chrome.runtime.openOptionsPage()
}

export default {
  [QUICK_CAST.RELOAD]: onReload,
  [QUICK_CAST.OPEN_OPTIONS_PAGE]: onOpenOptionsPage,
}
