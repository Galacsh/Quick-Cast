import { Action, ActionPanel, List } from '@/cast/api'
import { useCallback, useEffect, useState } from 'react'
import { requesters } from '../../actions'
import type { BookmarkNode, TabGroup } from '@/types'

type Props = {
  folder: BookmarkNode
}

export default function OpenInGroup({ folder }: Props) {
  const [groups, setGroups] = useState<TabGroup[]>([])

  const loadGroups = useCallback(async () => {
    const result = await chrome.tabGroups.query({})
    setGroups(result)
  }, [])

  const onSelect = useCallback(
    async (tabGroup: TabGroup) => {
      await requesters.openInGroup({ bookmark: folder, tabGroup })
      window.close()
    },
    [folder]
  )

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  return (
    <List
      navigationTitle={`Open "${folder.title || 'Untitled'}" in group`}
      searchBarPlaceholder="Search for a tab group...">
      {groups.map((group, idx) => (
        <List.Item
          key={`group-${idx}`}
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
