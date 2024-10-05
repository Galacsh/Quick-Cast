import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, List } from '@/cast/api'
import { useNavigation } from '@/cast/contexts'
import { bookmark as request } from '@/extensions/actions'
import OpenInGroup from './open-in-group'
import type { BookmarkNode } from '@/types'
import MoveToFolder from './move-to-folder'

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
    await request.open({ bookmark })
    window.close()
  }, [])

  const openInGroup = useCallback(
    (bookmark: BookmarkNode) => {
      push(<OpenInGroup bookmark={bookmark} />)
    },
    [push]
  )

  const deleteBookmark = useCallback(async (bookmark: BookmarkNode) => {
    await request.deleteBookmark({ bookmark })
  }, [])

  const moveToFolder = useCallback(
    (bookmark: BookmarkNode) => {
      push(<MoveToFolder bookmark={bookmark} />)
    },
    [push]
  )

  return (
    <List.Item
      icon={item.url ? faviconOf(item.url) : undefined}
      title={item.title}
      subtitle={item.url ? rootDomainOf(item.url) : undefined}
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
            title="Move to folder"
            onAction={() => moveToFolder(item)}
            shortcut={{ code: 'KeyM', ctrlMeta: true }}
          />
          <Action
            title="Delete"
            onAction={() => deleteBookmark(item)}
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
