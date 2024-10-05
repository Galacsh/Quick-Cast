import { useEffect, useState } from 'react'
import TabItem from './tab-item'
import type { Tab, TabGroup } from '@/types'

type TabGroupItemProps = {
  tabs: Tab[]
}

export default function TabGroupItem({ tabs }: TabGroupItemProps) {
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
    .map((tab) => <TabItem key={tab.id} tab={tab} group={group} />)
}
