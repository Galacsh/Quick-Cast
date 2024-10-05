import { useCallback, useEffect, useState } from 'react'
import { FileStack, FoldVertical } from 'lucide-react'
import { Action, ActionPanel, List } from '@/cast/api'
import { bookmark as request } from '@/extensions/actions'
import type { BookmarkNode, TabGroup } from '@/types'

type Props = {
  bookmark: BookmarkNode
}

export default function OpenInGroup({ bookmark }: Props) {
  const [groups, setGroups] = useState<TabGroup[]>([])

  const loadGroups = useCallback(async () => {
    const result = await chrome.tabGroups.query({})
    setGroups(result)
  }, [])

  const onSelect = useCallback(
    async (tabGroup: TabGroup) => {
      await request.openInGroup({ bookmark, tabGroup })
      window.close()
    },
    [bookmark]
  )

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  return (
    <List
      navigationTitle={`Open "${bookmark.title || 'Untitled'}" in group`}
      searchBarPlaceholder="Search for a tab group...">
      {groups.map((group, idx) => (
        <List.Item
          key={`group-${idx}`}
          icon={group.collapsed ? FoldVertical : FileStack}
          title={group.title || 'Untitled'}
          actions={
            <ActionPanel>
              <Action
                title="Select"
                onAction={() => onSelect(group)}
                shortcut={{ code: 'Enter' }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
