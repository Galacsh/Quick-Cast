import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, List } from '@/cast/api'
import { useNavigation } from '@/cast/contexts'
import { requesters } from '../../actions'
import OpenInGroup from './open-in-group'
import type { BookmarkNode } from '@/types'

export default function Command() {
  return (
    <List
      navigationTitle="Manage Bookmarks"
      searchBarPlaceholder="Search for a bookmark...">
      <BookmarkList />
    </List>
  )
}

function BookmarkList() {
  const [roots, setRoots] = useState<BookmarkNode[]>([])

  const loadBookmarks = useCallback(async () => {
    const tree = (await chrome.bookmarks.getTree()).at(0)
    if (tree == null || tree.children == null) {
      throw new Error('Cannot get bookmark tree.')
    }

    setRoots(tree.children)
  }, [])

  useEffect(() => {
    loadBookmarks()
  }, [loadBookmarks])

  useEffect(() => {
    chrome.bookmarks.onChanged.addListener(loadBookmarks)
    chrome.bookmarks.onChildrenReordered.addListener(loadBookmarks)
    chrome.bookmarks.onCreated.addListener(loadBookmarks)
    chrome.bookmarks.onMoved.addListener(loadBookmarks)
    chrome.bookmarks.onRemoved.addListener(loadBookmarks)
    return () => {
      chrome.bookmarks.onChanged.removeListener(loadBookmarks)
      chrome.bookmarks.onChildrenReordered.removeListener(loadBookmarks)
      chrome.bookmarks.onCreated.removeListener(loadBookmarks)
      chrome.bookmarks.onMoved.removeListener(loadBookmarks)
      chrome.bookmarks.onRemoved.removeListener(loadBookmarks)
    }
  }, [loadBookmarks])

  return roots.map((root) => <BookmarkRoot key={root.id} root={root} />)
}

type BookmarkRootProps = {
  root: BookmarkNode
}

function BookmarkRoot({ root }: BookmarkRootProps) {
  if (root.children == null) return null

  return root.children.map((node) => {
    if (node.children) return <BookmarkTree key={node.id} tree={node} />
    else return <BookmarkItem key={node.id} item={node} />
  })
}

type BookmarkTreeProps = {
  tree: BookmarkNode
  folderNames?: string[]
}

function BookmarkTree({ tree, folderNames }: BookmarkTreeProps) {
  if (tree.children == null) throw new Error('Tree node must have children.')

  const names = folderNames ? [...folderNames, tree.title] : [tree.title]
  return tree.children.map((node) => {
    if (node.children) {
      return <BookmarkTree key={node.id} tree={node} folderNames={names} />
    } else {
      return (
        <BookmarkItem
          key={node.id}
          item={node}
          folderName={names.join(' > ')}
        />
      )
    }
  })
}

type BookmarkItemProps = {
  item: BookmarkNode
  folderName?: string
}

function BookmarkItem({ item, folderName }: BookmarkItemProps) {
  const { push } = useNavigation()

  const openBookmark = useCallback(async (bookmark: BookmarkNode) => {
    await requesters.openBookmark({ bookmark })
    window.close()
  }, [])

  const openInGroup = useCallback(
    async (bookmark: BookmarkNode) => {
      push(<OpenInGroup bookmark={bookmark} />)
    },
    [push]
  )

  const removeBookmark = useCallback(async (bookmark: BookmarkNode) => {
    await requesters.removeBookmark({ bookmark })
  }, [])

  return (
    <List.Item
      icon={item.url ? faviconOf(item.url) : undefined}
      title={item.title}
      accessories={<span className="text-cmdk-placeholder">{folderName}</span>}
      actions={
        <ActionPanel>
          <Action
            title="Open"
            onAction={() => openBookmark(item)}
            shortcut={{ code: 'Enter' }}
          />
          <Action
            title="Open in group"
            onAction={() => openInGroup(item)}
            shortcut={{ code: 'Enter', ctrlMeta: true }}
          />
          <Action
            title="Delete"
            onAction={() => removeBookmark(item)}
            shortcut={{ code: 'KeyD', ctrlMeta: true }}
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
