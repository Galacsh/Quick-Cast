import { useCallback, useEffect, useMemo, useState } from 'react'
import { Action, ActionPanel, List } from '@/cast/api'
import type { History } from '@/types'
import { useNavigation, useSearch } from '@/cast/contexts'
import { requesters } from '../../actions'
import OpenInGroup from './open-in-group'

export default function Command() {
  return (
    <List
      filtering={false}
      navigationTitle="Manage Histories"
      searchBarPlaceholder="Search history for a week...">
      <HistoryList />
    </List>
  )
}

function HistoryList() {
  const { search } = useSearch()
  const { push } = useNavigation()

  const [histories, setHistories] = useState<History[]>([])
  const startTime = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date.valueOf()
  }, [])

  const loadHistories = useCallback(async () => {
    const result = await chrome.history.search({
      text: search,
      startTime,
    })
    setHistories(result)
  }, [search, startTime])

  const openHistory = useCallback(async (history: History) => {
    await requesters.openHistory({ history })
    window.close()
  }, [])

  const openInGroup = useCallback(
    async (history: History) => {
      push(<OpenInGroup history={history} />)
    },
    [push]
  )

  const removeHistory = useCallback(async (history: History) => {
    await requesters.removeHistory({ history })
  }, [])

  useEffect(() => {
    loadHistories()
  }, [loadHistories])

  useEffect(() => {
    chrome.history.onVisited.addListener(loadHistories)
    chrome.history.onVisitRemoved.addListener(loadHistories)
    return () => {
      chrome.history.onVisited.removeListener(loadHistories)
      chrome.history.onVisitRemoved.removeListener(loadHistories)
    }
  }, [loadHistories])

  return histories.map((history) => (
    <List.Item
      key={history.id}
      title={history.title || 'Untitled'}
      actions={
        <ActionPanel>
          <Action
            title="Open"
            onAction={() => openHistory(history)}
            shortcut={{ code: 'Enter' }}
          />
          <Action
            title="Open in group"
            onAction={() => openInGroup(history)}
            shortcut={{ code: 'Enter', ctrlMeta: true }}
          />
          <Action
            title="Remove"
            onAction={() => removeHistory(history)}
            shortcut={{ code: 'KeyD', ctrlMeta: true }}
          />
        </ActionPanel>
      }
    />
  ))
}
