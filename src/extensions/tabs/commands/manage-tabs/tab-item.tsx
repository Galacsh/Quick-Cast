import { useCallback, useEffect, useState } from 'react'
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'
import { Action, ActionPanel, List } from '@/cast/api'
import { requesters } from '../../actions'
import type { BookmarkNode, BookmarkRemoveInfo, Tab, TabGroup } from '@/types'
import { useNavigation } from '@/cast/contexts'
import MoveToGroup from './move-to-group'

type TabItemProps = {
  tab: Tab
  group?: TabGroup
}

export default function TabItem({ tab, group }: TabItemProps) {
  const [isBookmark, setIsBookmark] = useState(false)
  const { push } = useNavigation()

  useEffect(() => {
    chrome.bookmarks.search({ url: tab.url }).then((found) => {
      if (found.length > 0) {
        setIsBookmark(true)
      }
    })
  }, [tab.url])

  useEffect(() => {
    function onCreate(_: string, bookmark: BookmarkNode) {
      if (bookmark.url === tab.url) setIsBookmark(true)
    }

    function onRemove(_: string, removed: BookmarkRemoveInfo) {
      if (removed.node.url === tab.url) setIsBookmark(false)
    }

    chrome.bookmarks.onCreated.addListener(onCreate)
    chrome.bookmarks.onRemoved.addListener(onRemove)

    return () => {
      chrome.bookmarks.onCreated.removeListener(onCreate)
      chrome.bookmarks.onRemoved.removeListener(onRemove)
    }
  }, [tab.url])

  const switchToTab = useCallback(async (tab: Tab) => {
    requesters.switchToTab({ tabId: tab.id as number })
    window.close()
  }, [])

  const closeTab = useCallback(async (tab: Tab) => {
    await requesters.closeTab({ tabId: tab.id as number })
  }, [])

  const toggleBookmark = useCallback(async (tab: Tab) => {
    await requesters.toggleBookmark({ tabId: tab.id as number })
  }, [])

  const togglePin = useCallback(async (tab: Tab) => {
    await requesters.togglePin({ tab })
  }, [])

  const createTab = useCallback(async () => {
    await requesters.createTab()
  }, [])

  const removeFromGroup = useCallback(async (tab: Tab) => {
    await requesters.removeFromGroup({ tab })
  }, [])

  const moveToGroup = useCallback(
    (tab: Tab) => {
      push(<MoveToGroup tab={tab} />)
    },
    [push]
  )

  return (
    <List.Item
      key={tab.id}
      icon={isBookmark ? BookmarkFilledIcon : BookmarkIcon}
      title={tab.title || 'Untitled'}
      keywords={tab.url != null ? [tab.url] : undefined}
      accessories={
        <span className="text-cmdk-placeholder">
          {group?.title ? group.title : tab.pinned ? 'Pinned' : ''}
        </span>
      }
      actions={
        <ActionPanel>
          <Action
            title="Switch to tab"
            onAction={() => switchToTab(tab)}
            shortcut={{ code: 'Enter' }}
          />
          <Action
            title="Toggle bookmark"
            onAction={() => toggleBookmark(tab)}
            shortcut={{ code: 'KeyB', ctrlMeta: true }}
          />
          <Action
            title="Toggle pin"
            onAction={() => togglePin(tab)}
            shortcut={{ code: 'Backquote', ctrlMeta: true }}
          />
          <Action
            title="Move to group"
            onAction={() => moveToGroup(tab)}
            shortcut={{ code: 'KeyG', ctrlMeta: true }}
          />
          <Action
            title="Remove from group"
            onAction={() => removeFromGroup(tab)}
            shortcut={{ code: 'KeyU', ctrlMeta: true }}
          />
          <Action
            title="Close tab"
            onAction={() => closeTab(tab)}
            shortcut={{ code: 'KeyD', ctrlMeta: true }}
          />
          <Action
            title="Create tab"
            onAction={() => createTab()}
            shortcut={{ code: 'KeyT', ctrlMeta: true }}
          />
        </ActionPanel>
      }
    />
  )
}
