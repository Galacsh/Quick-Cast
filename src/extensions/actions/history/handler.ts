import { HISTORY } from '@/extensions/actions/id'
import { deleteHistory, open, openInGroup } from './requester'

const onOpen: typeof open = async ({ history }) => {
  const { url } = history
  if (url == null) throw new Error('URL is empty.')

  await chrome.tabs.create({ url, active: true })
}

const onOpenInGroup: typeof openInGroup = async ({ history, tabGroup }) => {
  const { url } = history
  const { id: groupId } = tabGroup
  if (url == null) throw new Error('URL is empty.')

  const tab = await chrome.tabs.create({ url, active: false })
  if (tab.id == null) throw new Error('Created tab has no id.')

  await chrome.tabs.group({ groupId, tabIds: tab.id })
  await chrome.tabs.update(tab.id, { active: true, muted: false })
}

const onDelete: typeof deleteHistory = async ({ history }) => {
  const { url } = history
  if (url == null) throw new Error('URL is empty.')

  await chrome.history.deleteUrl({ url })
}

export default {
  [HISTORY.OPEN]: onOpen,
  [HISTORY.OPEN_IN_GROUP]: onOpenInGroup,
  [HISTORY.DELETE]: onDelete,
}
