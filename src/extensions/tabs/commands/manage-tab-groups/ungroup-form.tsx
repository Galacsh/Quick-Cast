import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, Form } from '@/cast/api'
import type { Tab, TabGroup } from '@/types'
import { requesters } from '../../actions'

type Props = {
  tabGroup: TabGroup
}

export default function UngroupForm({ tabGroup }: Props) {
  const [tabs, setTabs] = useState<Tab[]>([])

  // submit form
  const submitForm = useCallback(async () => {
    if (tabs.length === 0) return
    await requesters.excludeTabs({ tabs })
  }, [tabs])

  return (
    <Form
      navigationTitle={`Remove tabs from "${tabGroup.title || 'Untitled'}"`}
      actions={
        <ActionPanel>
          <Action
            title="Submit"
            onAction={submitForm}
            shortcut={{ code: 'Enter', ctrlMeta: true }}
          />
        </ActionPanel>
      }>
      <MultiSelectTabs tabGroup={tabGroup} onChange={setTabs} />
    </Form>
  )
}

type MultiSelectTabsProps = {
  tabGroup: TabGroup
  onChange?: (tabs: Tab[]) => void
}

function MultiSelectTabs({ tabGroup, onChange }: MultiSelectTabsProps) {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [tabsError, setTabsError] = useState('')
  const [selectedTabs, setSelectedTabs] = useState<
    Map<number | undefined, Tab>
  >(new Map())

  const loadTabs = useCallback(async () => {
    const result = await chrome.tabs.query({ groupId: tabGroup.id })
    setTabs(result)

    let hasChange = false
    for (const [id] of selectedTabs) {
      const found = result.find((t) => t.id === id)
      if (!found) {
        selectedTabs.delete(id)
        hasChange = true
      }
    }

    if (hasChange) setSelectedTabs(new Map(selectedTabs))
  }, [selectedTabs, tabGroup.id])

  useEffect(() => {
    loadTabs()
  }, [loadTabs])

  useEffect(() => {
    if (onChange) {
      onChange([...selectedTabs.values()])
    }
  }, [onChange, selectedTabs])

  useEffect(() => {
    chrome.tabs.onRemoved.addListener(loadTabs)
    chrome.tabs.onCreated.addListener(loadTabs)
    chrome.tabs.onUpdated.addListener(loadTabs)
    return () => {
      chrome.tabs.onRemoved.removeListener(loadTabs)
      chrome.tabs.onCreated.removeListener(loadTabs)
      chrome.tabs.onUpdated.removeListener(loadTabs)
    }
  }, [loadTabs])

  // validation
  useEffect(() => {
    if (selectedTabs.size === 0) {
      setTabsError('No tabs selected.')
    } else {
      setTabsError('')
    }
  }, [selectedTabs.size])

  const onSelect = useCallback(
    (tab: Tab) => {
      setSelectedTabs(new Map(selectedTabs.set(tab.id, tab)))
    },
    [selectedTabs]
  )

  const onDeselect = useCallback(
    (tab: Tab) => {
      selectedTabs.delete(tab.id)
      setSelectedTabs(new Map(selectedTabs))
    },
    [selectedTabs]
  )

  return (
    <Form.MultiSelect
      title="Tabs to remove"
      error={tabsError}
      placeholder="Search tabs to remove..."
      hasSelectedItems={selectedTabs.size > 0}
      autoFocus>
      {tabs.map((tab) => (
        <Form.MultiSelectItem
          key={tab.id}
          title={tab.title || 'Untitled'}
          keywords={tab.url != null ? [tab.url] : undefined}
          onSelect={() => onSelect(tab)}
          onDeselect={() => onDeselect(tab)}
        />
      ))}
    </Form.MultiSelect>
  )
}
