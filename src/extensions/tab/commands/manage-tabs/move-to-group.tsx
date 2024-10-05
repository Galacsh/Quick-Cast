import { Action, ActionPanel, List } from '@/cast/api'
import { useCallback, useEffect, useState } from 'react'
import { tab as request } from '@/extensions/actions'
import type { Tab, TabGroup } from '@/types'
import { FileStack, FoldVertical } from 'lucide-react'

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
      await request.moveToGroup({ tab, tabGroup })
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
