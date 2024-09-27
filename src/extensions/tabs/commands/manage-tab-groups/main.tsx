import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, List } from '@/cast/api'
import { ComponentInstanceIcon, ComponentNoneIcon } from '@radix-ui/react-icons'
import { requesters } from '../../actions'
import type { TabGroup } from '@/types'

export default function Command() {
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([])

  const loadTabGroups = useCallback(async () => {
    const result = await chrome.tabGroups.query({})
    setTabGroups(result)
  }, [])

  useEffect(() => {
    loadTabGroups()
  }, [loadTabGroups])

  useEffect(() => {
    chrome.tabGroups.onRemoved.addListener(loadTabGroups)
    chrome.tabGroups.onCreated.addListener(loadTabGroups)
    chrome.tabGroups.onUpdated.addListener(loadTabGroups)
    return () => {
      chrome.tabGroups.onRemoved.removeListener(loadTabGroups)
      chrome.tabGroups.onCreated.removeListener(loadTabGroups)
      chrome.tabGroups.onUpdated.removeListener(loadTabGroups)
    }
  }, [loadTabGroups])

  // ========================================

  return (
    <List
      navigationTitle="Manage Tab Groups"
      searchBarPlaceholder="Search for a tab group to manage...">
      {tabGroups.map((tabGroup) => (
        <List.Item
          key={tabGroup.id}
          icon={tabGroup.collapsed ? ComponentNoneIcon : ComponentInstanceIcon}
          title={tabGroup.title || 'Untitled'}
          actions={
            <ActionPanel>
              <Action
                isDefault
                title="Toggle collapse"
                onAction={() => requesters.toggleCollapseGroup({ tabGroup })}
              />
              <Action
                title="Close group"
                onAction={() => requesters.closeTabGroup({ tabGroup })}
                shortcut={{ code: 'KeyD', ctrlMeta: true }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
