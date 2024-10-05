import type { BookmarkNode } from '@/types'

export function getBookmarks(tree: BookmarkNode[]): BookmarkNode[] {
  const bookmarks: BookmarkNode[] = []

  function traverse(node: BookmarkNode) {
    // If the node has a URL, it's a bookmark item
    if (node.url) {
      bookmarks.push(node)
    }

    // If the node has children, recursively traverse them
    if (node.children) {
      node.children.forEach(traverse)
    }
  }

  // Start the traversal from the root of the tree
  tree.forEach(traverse)

  return bookmarks
}
