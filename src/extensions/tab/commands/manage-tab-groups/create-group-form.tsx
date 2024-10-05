import { useCallback, useEffect, useMemo, useState } from 'react'
import { Form, Action, ActionPanel } from '@/cast/api'
import { tab as request } from '@/extensions/actions'
import type { Tab, TabGroup } from '@/types'

export default function CreateGroupForm() {
  const [name, setName] = useState('')
  const [selectedTabs, setSelectedTabs] = useState<Tab[]>([])

  // submit form
  const submitForm = useCallback(async () => {
    if (name === '' || selectedTabs.length === 0) return
    await request.createGroup({ title: name, tabs: selectedTabs })
    window.close()
  }, [name, selectedTabs])

  return (
    <Form
      navigationTitle="Create group"
      actions={
        <ActionPanel>
          <Action
            title="Submit"
            onAction={submitForm}
            shortcut={{ code: 'Enter', ctrlMeta: true }}
          />
        </ActionPanel>
      }>
      <TabGroupNameField onChange={setName} />
      <MultiSelectTabs onChange={setSelectedTabs} />
    </Form>
  )
}

type TabGroupNameFieldProps = {
  onChange?: (name: string) => void
}

function TabGroupNameField({ onChange }: TabGroupNameFieldProps) {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  // validation
  useEffect(() => {
    if (name === '') {
      setNameError('Group name is empty.')
    } else {
      setNameError('')
    }
  }, [name])

  useEffect(() => {
    if (onChange) {
      onChange(name)
    }
  }, [name, onChange])

  return (
    <Form.TextField
      autoFocus
      title="Group name"
      placeholder="Type group name..."
      error={nameError}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}

type MultiSelectTabsProps = {
  onChange?: (tabs: Tab[]) => void
}

function MultiSelectTabs({ onChange }: MultiSelectTabsProps) {
  const [tabs, setTabs] = useState<Tab[]>([])
  const grouped = useMemo(
    () => groupBy(tabs, (tab) => (tab.groupId === -1 ? null : tab.groupId)),
    [tabs]
  )

  const [tabsError, setTabsError] = useState('')
  const [selectedTabs, setSelectedTabs] = useState<
    Map<number | undefined, Tab>
  >(new Map())

  const loadTabs = useCallback(async () => {
    const result = await chrome.tabs.query({})
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
  }, [selectedTabs])

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
      title="Select tabs"
      error={tabsError}
      placeholder="Search tabs to group..."
      hasSelectedItems={selectedTabs.size > 0}>
      {grouped.map((obj, idx) => {
        if (Array.isArray(obj)) {
          return (
            <TabGroupItem
              key={`group-${idx}`}
              tabs={obj}
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          )
        } else {
          return (
            <TabItem
              key={obj.id}
              tab={obj}
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          )
        }
      })}
    </Form.MultiSelect>
  )
}

function groupBy<T, K>(arr: T[], picker: (item: T) => K | null): (T | T[])[] {
  const result: (T | T[])[] = []
  let group: T[] = []

  for (const item of arr) {
    const key = picker(item)

    if (key === null) {
      if (group.length > 0) {
        result.push(group)
        group = []
      }
      result.push(item)
    } else {
      if (group.length === 0 || picker(group[0]) === key) {
        group.push(item)
      } else {
        result.push(group)
        group = [item]
      }
    }
  }

  if (group.length > 0) {
    result.push(group)
  }

  return result
}

type TabGroupItemProps = {
  tabs: Tab[]
  onSelect: (tab: Tab) => void
  onDeselect: (tab: Tab) => void
}

function TabGroupItem({ tabs, onSelect, onDeselect }: TabGroupItemProps) {
  const [group, setGroup] = useState<TabGroup>()

  useEffect(() => {
    if (tabs.length > 0) {
      const { groupId } = tabs[0]
      chrome.tabGroups.get(groupId).then((g) => setGroup(g))
    }
  }, [tabs])

  if (group == null) return <></>

  return tabs
    .filter((tab) => tab.id != null && tab.id !== -1)
    .map((tab) => (
      <TabItem
        key={tab.id}
        tab={tab}
        group={group}
        onSelect={onSelect}
        onDeselect={onDeselect}
      />
    ))
}

type TabItemProps = {
  tab: Tab
  group?: TabGroup
  onSelect: (tab: Tab) => void
  onDeselect: (tab: Tab) => void
}

function TabItem({ tab, group, onSelect, onDeselect }: TabItemProps) {
  return (
    <Form.MultiSelectItem
      key={tab.id}
      title={tab.title || 'Untitled'}
      keywords={tab.url != null ? [tab.url] : undefined}
      onSelect={() => onSelect(tab)}
      onDeselect={() => onDeselect(tab)}
      accessories={
        <span className="text-cmdk-placeholder">{group?.title}</span>
      }
    />
  )
}
