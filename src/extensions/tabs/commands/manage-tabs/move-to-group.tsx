import { Action, ActionPanel, List } from '@/cast/api'
import type { Tab, TabGroup } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { requesters } from '../../actions'

type Props = {
  tab: Tab
}

export default function MoveToGroup({ tab }: Props) {
  const [groups, setGroups] = useState<TabGroup[]>([])

  const loadGroups = useCallback(async () => {
    const result = await chrome.tabGroups.query({})
    setGroups(result)
  }, [])

  const onSelect = useCallback(
    async (tabGroup: TabGroup) => {
      await requesters.moveToGroup({ tab, tabGroup })
      window.close()
    },
    [tab]
  )

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  return (
    <List
      navigationTitle={`Move "${tab.title || 'Untitled'}" to group`}
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
