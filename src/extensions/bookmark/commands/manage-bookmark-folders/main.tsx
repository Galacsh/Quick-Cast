import { Fragment, useCallback, useEffect, useState } from 'react'
import { FolderHeart as FolderIcon } from 'lucide-react'
import { useNavigation } from '@/cast/contexts'
import { bookmark as request } from '@/extensions/actions'
import { Action, ActionPanel, List } from '@/cast/api'
import OpenInGroup from './open-in-group'
import OpenAsGroup from './open-as-group'
import EditFolderName from './edit-folder-name'
import type { BookmarkNode } from '@/types'

export default function Command() {
  return (
    <List
      navigationTitle="Manage Bookmarks"
      searchBarPlaceholder="Search for a bookmark...">
      <BookmarkFolderList />
    </List>
  )
}

function BookmarkFolderList() {
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

function hasFolder(node: BookmarkNode) {
  if (node.children && node.children.some((child) => child.children != null)) {
    return true
  }
  return false
}

type BookmarkRootProps = {
  root: BookmarkNode
}

function BookmarkRoot({ root }: BookmarkRootProps) {
  if (root.children == null) return null

  return root.children.map((node) => {
    if (node.children == null) return null
    else if (hasFolder(node))
      return (
        <Fragment key={node.id}>
          <Folder folder={node} />
          <FolderNested nested={node} />
        </Fragment>
      )
    else return <Folder key={node.id} folder={node} />
  })
}

type FolderNestedProps = {
  nested: BookmarkNode
  folderNames?: string[]
}

function FolderNested({ nested, folderNames }: FolderNestedProps) {
  if (nested.children == null) {
    throw new Error('Nested folder must have children.')
  }

  const names = folderNames ? [...folderNames, nested.title] : [nested.title]
  return nested.children.map((node) => {
    if (node.children == null) return null
    else if (hasFolder(node)) {
      return (
        <Fragment key={node.id}>
          <Folder folder={node} folderNames={names} />
          <FolderNested nested={node} folderNames={names} />
        </Fragment>
      )
    } else {
      return <Folder key={node.id} folder={node} folderNames={names} />
    }
  })
}

type FolderProps = {
  folder: BookmarkNode
  folderNames?: string[]
}

function Folder({ folder, folderNames }: FolderProps) {
  const { push } = useNavigation()

  const openFolder = useCallback(async (folder: BookmarkNode) => {
    await request.openFolder({ folder })
    window.close()
  }, [])

  const openInGroup = useCallback(
    async (folder: BookmarkNode) => {
      push(<OpenInGroup folder={folder} />)
    },
    [push]
  )

  const openAsGroup = useCallback(
    (folder: BookmarkNode) => {
      push(<OpenAsGroup folder={folder} />)
    },
    [push]
  )

  const removeFolder = useCallback(async (folder: BookmarkNode) => {
    await request.deleteFolder({ folder })
  }, [])

  const editFolderName = useCallback(
    (folder: BookmarkNode) => {
      push(<EditFolderName folder={folder} />)
    },
    [push]
  )

  const names = folderNames ? [...folderNames, folder.title] : [folder.title]
  const itemsCount = folder.children?.length || 0

  return (
    <List.Item
      icon={FolderIcon}
      title={names.join(' > ')}
      accessories={
        <span className="text-cmdk-section-title">{itemsCount} items</span>
      }
      actions={
        <ActionPanel>
          <Action
            title="Open"
            onAction={() => openFolder(folder)}
            shortcut={{ code: 'Enter' }}
          />
          <Action
            title="Open in group"
            onAction={() => openInGroup(folder)}
            shortcut={{ code: 'Enter', ctrlMeta: true }}
          />
          <Action
            title="Open as group"
            onAction={() => openAsGroup(folder)}
            shortcut={{ code: 'KeyG', ctrlMeta: true }}
          />
          <Action
            title="Edit folder name"
            onAction={() => editFolderName(folder)}
            shortcut={{ code: 'KeyE', ctrlMeta: true }}
          />
          <Action
            title="Delete"
            onAction={() => removeFolder(folder)}
            shortcut={{ code: 'KeyD', ctrlMeta: true }}
          />
        </ActionPanel>
      }
    />
  )
}
