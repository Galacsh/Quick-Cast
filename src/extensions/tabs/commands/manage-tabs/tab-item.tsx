import { useCallback, useEffect, useState } from 'react'
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'
import { Action, ActionPanel, List } from '@/cast/api'
import { requesters } from '../../actions'
import type { BookmarkNode, BookmarkRemoveInfo, Tab, TabGroup } from '@/types'

type TabItemProps = {
  tab: Tab
  group?: TabGroup
}

export default function TabItem({ tab, group }: TabItemProps) {
  const [isBookmark, setIsBookmark] = useState(false)

  useEffect(() => {
    chrome.bookmarks.search({ url: tab.url }).then((found) => {
      if (found.length > 0) {
        setIsBookmark(true)
      }
    })

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

  return (
    <List.Item
      key={tab.id}
      icon={isBookmark ? BookmarkFilledIcon : BookmarkIcon}
      title={tab.title || 'Untitled'}
      keywords={tab.url != null ? [tab.url] : undefined}
      accessories={
        <span className="text-cmdk-placeholder">{group?.title}</span>
      }
      actions={
        <ActionPanel>
          <Action
            isDefault
            title="Switch to tab"
            onAction={() => switchToTab(tab)}
          />
          <Action
            title="Close tab"
            onAction={() => closeTab(tab)}
            shortcut={{ code: 'KeyD', ctrlMeta: true }}
          />
          <Action
            title="Toggle bookmark"
            onAction={() => toggleBookmark(tab)}
            shortcut={{ code: 'KeyB', ctrlMeta: true }}
          />
        </ActionPanel>
      }
    />
  )
}
