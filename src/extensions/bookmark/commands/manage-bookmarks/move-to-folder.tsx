import { Fragment, useCallback, useEffect, useState } from 'react'
import { FolderHeart as FolderIcon } from 'lucide-react'
import { bookmark as request } from '@/extensions/actions'
import { Action, ActionPanel, List } from '@/cast/api'
import type { BookmarkNode } from '@/types'

type Props = {
  bookmark: BookmarkNode
}

export default function MoveToFolder({ bookmark }: Props) {
  const [roots, setRoots] = useState<BookmarkNode[]>([])

  const move = useCallback(
    async (bookmark: BookmarkNode, folder: BookmarkNode) => {
      request.moveToFolder({ bookmark, folder })
      window.close()
    },
    []
  )

  const loadBookmarks = useCallback(async () => {
    const tree = await chrome.bookmarks.getTree()
    setRoots(tree)
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

  return (
    <List
      navigationTitle="Manage Bookmarks"
      searchBarPlaceholder="Search for a bookmark...">
      {roots.map((root) => (
        <BookmarkRoot
          key={root.id}
          root={root}
          onSelect={(folder) => move(bookmark, folder)}
        />
      ))}
    </List>
  )
}

function hasFolder(node: BookmarkNode) {
  if (node.children && node.children.some((child) => child.children != null)) {
    return true
  }
  return false
}

type BookmarkRootProps = {
  root: BookmarkNode
  onSelect?: (folder: BookmarkNode) => void
}

function BookmarkRoot({ root, onSelect }: BookmarkRootProps) {
  if (root.children == null) return null

  return root.children.map((node) => {
    if (node.children == null) return null
    else if (hasFolder(node))
      return (
        <Fragment key={node.id}>
          <Folder folder={node} onSelect={onSelect} />
          <FolderNested nested={node} onSelect={onSelect} />
        </Fragment>
      )
    else return <Folder key={node.id} folder={node} onSelect={onSelect} />
  })
}

type FolderNestedProps = {
  nested: BookmarkNode
  folderNames?: string[]
  onSelect?: (folder: BookmarkNode) => void
}

function FolderNested({ nested, folderNames, onSelect }: FolderNestedProps) {
  if (nested.children == null) {
    throw new Error('Nested folder must have children.')
  }

  const names = folderNames ? [...folderNames, nested.title] : [nested.title]
  return nested.children.map((node) => {
    if (node.children == null) return null
    else if (hasFolder(node)) {
      return (
        <Fragment key={node.id}>
          <Folder folder={node} folderNames={names} onSelect={onSelect} />
          <FolderNested nested={node} folderNames={names} onSelect={onSelect} />
        </Fragment>
      )
    } else {
      return (
        <Folder
          key={node.id}
          folder={node}
          folderNames={names}
          onSelect={onSelect}
        />
      )
    }
  })
}

type FolderProps = {
  folder: BookmarkNode
  folderNames?: string[]
  onSelect?: (folder: BookmarkNode) => void
}

function Folder({ folder, folderNames, onSelect }: FolderProps) {
  const itemsCount = folder.children?.length || 0

  return (
    <List.Item
      icon={FolderIcon}
      title={folder.title}
      subtitle={folderNames?.join(' > ')}
      accessories={
        <span className="text-cmdk-section-title">{itemsCount} items</span>
      }
      actions={
        <ActionPanel>
          <Action
            title="Select"
            onAction={() => {
              if (onSelect) onSelect(folder)
            }}
            shortcut={{ code: 'Enter' }}
          />
        </ActionPanel>
      }
    />
  )
}
