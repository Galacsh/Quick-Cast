import { Action, ActionPanel, List } from '@/cast/api'
import { useCallback, useEffect, useState } from 'react'
import { requesters } from '../../actions'
import type { History, TabGroup } from '@/types'

type Props = {
  history: History
}

export default function OpenInGroup({ history }: Props) {
  const [groups, setGroups] = useState<TabGroup[]>([])

  const loadGroups = useCallback(async () => {
    const result = await chrome.tabGroups.query({})
    setGroups(result)
  }, [])

  const onSelect = useCallback(
    async (tabGroup: TabGroup) => {
      await requesters.openInGroup({ history, tabGroup })
      window.close()
    },
    [history]
  )

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  return (
    <List
      navigationTitle={`Open "${history.title || 'Untitled'}" in group`}
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
