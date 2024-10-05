import { useCallback, useEffect, useState } from 'react'
import { Bookmark as BookmarkIcon } from 'lucide-react'
import { Action, ActionPanel, List } from '@/cast/api'
import { tab as request } from '@/extensions/actions'
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
    request.switchTo({ tab })
    window.close()
  }, [])

  const closeTab = useCallback(async (tab: Tab) => {
    await request.close({ tab })
  }, [])

  const toggleBookmark = useCallback(async (tab: Tab) => {
    await request.toggleBookmark({ tab })
  }, [])

  const togglePin = useCallback(async (tab: Tab) => {
    await request.togglePin({ tab })
  }, [])

  const createTab = useCallback(async () => {
    await request.create()
  }, [])

  const removeFromGroup = useCallback(async (tab: Tab) => {
    await request.removeFromGroup({ tab })
  }, [])

  const moveToGroup = useCallback(
    (tab: Tab) => {
      push(<MoveToGroup tab={tab} />)
    },
    [push]
  )

  const moveUp = useCallback(async (tab: Tab) => {
    let pos = tab.index - 1
    if (pos < 0) pos = 0
    const edited = Object.assign({}, tab, { index: pos })
    await request.move({ tab: edited })
  }, [])

  const moveDown = useCallback(async (tab: Tab) => {
    const edited = Object.assign({}, tab, { index: tab.index + 1 })
    await request.move({ tab: edited })
  }, [])

  const moveTop = useCallback(async (tab: Tab) => {
    const edited = Object.assign({}, tab, { index: 0 })
    await request.move({ tab: edited })
  }, [])

  const moveBottom = useCallback(async (tab: Tab) => {
    const edited = Object.assign({}, tab, { index: -1 })
    await request.move({ tab: edited })
  }, [])

  return (
    <List.Item
      key={tab.id}
      icon={tab.url ? faviconOf(tab.url) : undefined}
      title={tab.title || 'Untitled'}
      subtitle={tab.url ? rootDomainOf(tab.url) : undefined}
      keywords={tab.url != null ? [tab.url] : undefined}
      accessories={
        <div className="flex items-center gap-2">
          <span className="text-cmdk-section-title">
            {group?.title ? group.title : tab.pinned ? 'Pinned' : ''}
          </span>
          <span className="text-cmdk-section-title">
            {isBookmark ? (
              <BookmarkIcon className="size-4 fill-cmdk-section-title" />
            ) : (
              <BookmarkIcon className="size-4" />
            )}
          </span>
        </div>
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
            title="Move up"
            onAction={() => moveUp(tab)}
            shortcut={{ code: 'ArrowUp', ctrlMeta: true, shift: true }}
          />
          <Action
            title="Move down"
            onAction={() => moveDown(tab)}
            shortcut={{ code: 'ArrowDown', ctrlMeta: true, shift: true }}
          />
          <Action
            title="Move top"
            onAction={() => moveTop(tab)}
            shortcut={{ code: 'ArrowLeft', ctrlMeta: true, shift: true }}
          />
          <Action
            title="Move bottom"
            onAction={() => moveBottom(tab)}
            shortcut={{ code: 'ArrowRight', ctrlMeta: true, shift: true }}
          />
          {group && (
            <Action
              title="Remove from group"
              onAction={() => removeFromGroup(tab)}
              shortcut={{ code: 'KeyU', ctrlMeta: true }}
            />
          )}
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

function faviconSrc(url: string) {
  const _url = new URL(chrome.runtime.getURL('/_favicon/'))
  _url.searchParams.set('pageUrl', url)
  _url.searchParams.set('size', '32')
  return _url.toString()
}

function faviconOf(url: string) {
  const src = faviconSrc(url)
  const BookmarkFavicon = (props: { className?: string }) => (
    <img src={src} {...props} />
  )
  return BookmarkFavicon
}

function rootDomainOf(url: string) {
  const _url = new URL(url)
  const domainParts = _url.hostname.split('.')
  // If the domain has more than 2 parts, assume the last two are the main domain
  // Example: 'www.example.co.uk' -> 'example.co.uk'
  if (domainParts.length > 2) {
    return domainParts.slice(-2).join('.')
  }
  // If the domain has only 2 parts or fewer, return it as is
  return _url.hostname
}
