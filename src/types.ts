export type Theme = 'dark' | 'light' | 'system'

// ================================

export type Message<P = void> = P extends void
  ? { id: string }
  : { id: string; payload: P }

export type ResponseFail = { status: 'fail'; error: string }
export type ResponseOkay<T = void> = T extends void
  ? { status: 'ok' }
  : { status: 'ok'; data: T }
export type Response<T = void> = ResponseFail | ResponseOkay<T>

export type HasNoPayload<T> = T extends () => infer OUT ? () => OUT : never
export type HasPayload<T> = T extends (payload: infer IN) => infer OUT
  ? (payload: IN) => OUT
  : never
export type Handler<T> =
  HasNoPayload<T> extends never ? HasPayload<T> : HasNoPayload<T>

// ================================

// chrome type aliases
export type Tab = chrome.tabs.Tab
export type TabGroup = chrome.tabGroups.TabGroup
export type BookmarkNode = chrome.bookmarks.BookmarkTreeNode
export type BookmarkRemoveInfo = chrome.bookmarks.BookmarkRemoveInfo
export type History = chrome.history.HistoryItem
export type MessageSender = chrome.runtime.MessageSender
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SendResponse = (response?: any) => void
