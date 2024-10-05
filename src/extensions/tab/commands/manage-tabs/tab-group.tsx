import { useCallback, useEffect, useState } from 'react'
import TabItem from './tab-item'
import type { Tab, TabGroup } from '@/types'

type TabGroupItemProps = {
  tabs: Tab[]
}

export default function TabGroupItem({ tabs }: TabGroupItemProps) {
  const [group, setGroup] = useState<TabGroup>()

  const loadGroup = useCallback(async () => {
    if (tabs.length > 0) {
      const { groupId } = tabs[0]
      chrome.tabGroups.get(groupId).then((g) => setGroup(g))
    }
  }, [tabs])

  useEffect(() => {
    loadGroup()
    chrome.tabGroups.onCreated.addListener(loadGroup)
    chrome.tabGroups.onUpdated.addListener(loadGroup)
    chrome.tabGroups.onRemoved.addListener(loadGroup)
    chrome.tabGroups.onMoved.addListener(loadGroup)

    return () => {
      chrome.tabGroups.onCreated.removeListener(loadGroup)
      chrome.tabGroups.onUpdated.removeListener(loadGroup)
      chrome.tabGroups.onRemoved.removeListener(loadGroup)
      chrome.tabGroups.onMoved.removeListener(loadGroup)
    }
  }, [loadGroup])

  if (group == null) return <></>

  return tabs
    .filter((tab) => tab.id != null && tab.id !== -1)
    .map((tab) => <TabItem key={tab.id} tab={tab} group={group} />)
}
