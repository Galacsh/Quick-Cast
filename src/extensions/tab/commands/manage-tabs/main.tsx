import { useCallback, useEffect, useMemo, useState } from 'react'
import { List } from '@/cast/api'
import TabGroupItem from './tab-group'
import TabItem from './tab-item'
import type { Tab } from '@/types'

export default function Command() {
  const [tabs, setTabs] = useState<Tab[]>([])
  const grouped = useMemo(
    () => groupBy(tabs, (tab) => (tab.groupId === -1 ? null : tab.groupId)),
    [tabs]
  )

  const loadTabs = useCallback(async () => {
    const result = await chrome.tabs.query({})
    setTabs(result)
  }, [])

  useEffect(() => {
    loadTabs()
  }, [loadTabs])

  useEffect(() => {
    chrome.tabs.onRemoved.addListener(loadTabs)
    chrome.tabs.onCreated.addListener(loadTabs)
    chrome.tabs.onUpdated.addListener(loadTabs)
    chrome.tabs.onMoved.addListener(loadTabs)
    return () => {
      chrome.tabs.onRemoved.removeListener(loadTabs)
      chrome.tabs.onCreated.removeListener(loadTabs)
      chrome.tabs.onUpdated.removeListener(loadTabs)
      chrome.tabs.onMoved.removeListener(loadTabs)
    }
  }, [loadTabs])

  // ========================================

  return (
    <List
      navigationTitle="Manage Tabs"
      searchBarPlaceholder="Search for a tab to manage...">
      {grouped.map((obj, idx) => {
        if (Array.isArray(obj)) {
          return <TabGroupItem key={`group-${idx}`} tabs={obj} />
        } else {
          return <TabItem key={obj.id} tab={obj} />
        }
      })}
    </List>
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
