import { TAB } from '@/extensions/actions/id'
import type {
  close,
  closeGroup,
  create,
  createGroup,
  editGroupName,
  excludeTabs,
  move,
  moveToGroup,
  removeFromGroup,
  switchTo,
  toggleBookmark,
  toggleCollapseGroup,
  togglePin,
} from './requester'

const onSwitchTo: typeof switchTo = async ({ tab }) => {
  const { id } = tab
  if (id == null) throw new Error('Cannot find tab id.')

  await chrome.tabs.update(id, { active: true, muted: false })
}

const onClose: typeof close = async ({ tab }) => {
  const { id } = tab
  if (id == null) throw new Error('Cannot find tab id.')

  await chrome.tabs.remove(id)
}

const onToggleBookmark: typeof toggleBookmark = async ({ tab }) => {
  const { id, title, url } = tab
  if (id == null) throw new Error('Cannot find tab id.')
  if (url == null) throw new Error('Cannot find tab URL.')

  const found = await chrome.bookmarks.search({ url })

  // if bookmark exists, remove
  if (found.length > 0) {
    await Promise.all(found.map(({ id }) => chrome.bookmarks.remove(id)))
  }

  // else, add bookmark
  else {
    const roots = await chrome.bookmarks.getChildren('0')
    const first = roots.find(({ index }) => index === 0)
    if (first == null) throw new Error('Cannot find bookmark tree.')

    const { id: parentId } = first
    await chrome.bookmarks.create({ title, url, parentId })
  }
}

const onTogglePin: typeof togglePin = async ({ tab }) => {
  const { id, pinned } = tab
  if (id == null) throw new Error('Cannot find tab id.')

  await chrome.tabs.update(id, { pinned: !pinned })
}

const onCreate: typeof create = async () => {
  await chrome.tabs.create({ active: true })
}

const onRemoveFromGroup: typeof removeFromGroup = async ({ tab }) => {
  const { id } = tab
  if (id == null) throw new Error('Cannot find tab id.')

  await chrome.tabs.ungroup(id)
}

const onMoveToGroup: typeof moveToGroup = async ({ tab, tabGroup }) => {
  const { id: tabId } = tab
  const { id: groupId } = tabGroup
  if (tabId == null) throw new Error('Cannot find tab id.')
  if (groupId == null) throw new Error('Cannot find tab group id.')

  await chrome.tabs.group({ groupId, tabIds: tabId })
}

const onMove: typeof move = async ({ tab }) => {
  const { id, index } = tab
  if (id == null) throw new Error('Cannot find tab id.')
  await chrome.tabs.move(id, { index })
}

const onToggleCollapseGroup: typeof toggleCollapseGroup = async ({
  tabGroup,
}) => {
  const { id, collapsed } = tabGroup
  await chrome.tabGroups.update(id, { collapsed: !collapsed })
}

const onCloseGroup: typeof closeGroup = async ({ tabGroup }) => {
  const tabs = await chrome.tabs.query({ groupId: tabGroup.id })
  const ids = tabs.map((tab) => tab.id).filter((id) => id != null)
  await chrome.tabs.remove(ids)
}

const onCreateGroup: typeof createGroup = async ({ title, tabs }) => {
  const tabIds = tabs.map(({ id }) => id).filter((id) => id != null)
  const groupId = await chrome.tabs.group({ tabIds })
  await chrome.tabGroups.update(groupId, { title })
}

const onEditGroupName: typeof editGroupName = async ({ title, tabGroup }) => {
  const { id } = tabGroup
  await chrome.tabGroups.update(id, { title })
}

const onExcludeTabs: typeof excludeTabs = async ({ tabs }) => {
  const tabIds = tabs.map(({ id }) => id).filter((id) => id != null)
  await chrome.tabs.ungroup(tabIds)
}

export default {
  [TAB.SWITCH_TO]: onSwitchTo,
  [TAB.CLOSE]: onClose,
  [TAB.TOGGLE_BOOKMARK]: onToggleBookmark,
  [TAB.TOGGLE_PIN]: onTogglePin,
  [TAB.CREATE]: onCreate,
  [TAB.REMOVE_FROM_GROUP]: onRemoveFromGroup,
  [TAB.MOVE_TO_GROUP]: onMoveToGroup,
  [TAB.MOVE]: onMove,
  [TAB.TOGGLE_COLLAPSE_GROUP]: onToggleCollapseGroup,
  [TAB.CLOSE_GROUP]: onCloseGroup,
  [TAB.CREATE_GROUP]: onCreateGroup,
  [TAB.EDIT_GROUP_NAME]: onEditGroupName,
  [TAB.EXCLUDE_TABS]: onExcludeTabs,
}
