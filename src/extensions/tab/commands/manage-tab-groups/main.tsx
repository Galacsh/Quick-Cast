import { useCallback, useEffect, useState } from 'react'
import { BoxModelIcon, TransparencyGridIcon } from '@radix-ui/react-icons'
import CreateGroupForm from './create-group-form'
import EditGroupNameForm from './edit-group-name-form'
import UngroupForm from './ungroup-form'
import { Action, ActionPanel, List } from '@/cast/api'
import { useNavigation } from '@/cast/contexts'
import { tab as request } from '@/extensions/actions'
import type { TabGroup } from '@/types'

export default function Command() {
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([])
  const { push } = useNavigation()

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
          icon={tabGroup.collapsed ? TransparencyGridIcon : BoxModelIcon}
          title={tabGroup.title || 'Untitled'}
          actions={
            <ActionPanel>
              <Action
                title="Toggle collapse"
                onAction={() => request.toggleCollapseGroup({ tabGroup })}
                shortcut={{ code: 'Enter' }}
              />
              <Action
                title="Close group"
                onAction={() => request.closeGroup({ tabGroup })}
                shortcut={{ code: 'KeyD', ctrlMeta: true }}
              />
              <Action
                title="Edit group name"
                onAction={() => push(<EditGroupNameForm tabGroup={tabGroup} />)}
                shortcut={{ code: 'KeyE', ctrlMeta: true }}
              />
              <Action
                title="Remove tabs"
                onAction={() => push(<UngroupForm tabGroup={tabGroup} />)}
                shortcut={{ code: 'KeyR', ctrlMeta: true }}
              />
              <Action
                title="Create group"
                onAction={() => push(<CreateGroupForm />)}
                shortcut={{ code: 'KeyG', ctrlMeta: true }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
