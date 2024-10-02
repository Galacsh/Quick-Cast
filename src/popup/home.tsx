import { useCallback } from 'react'
import { List, ActionPanel, Action } from '@/cast/api'
import { useNavigation, useSearch } from '@/cast/contexts'
import { extensions } from '@/extensions'
import type { Command } from '@/cast/types'

export default function Home() {
  const { push } = useNavigation()
  const { clear } = useSearch()

  const openView = useCallback(
    (cmd: Extract<Command, { mode: 'view' }>) => {
      push(cmd.view)
      clear()
    },
    [clear, push]
  )

  const runAction = useCallback(
    (cmd: Extract<Command, { mode: 'no-view' }>) => {
      cmd.action()
      window.close()
    },
    []
  )

  return (
    <List
      navigationTitle="Home"
      searchBarPlaceholder="Search for tabs, bookmarks, histories and commands...">
      {extensions.map((extension, idx) => (
        <List.Section key={`ext-${idx}`} title={extension.name}>
          {extension.commands.map((cmd, cmdIdx) => (
            <List.Item
              key={`${idx}-${cmdIdx}`}
              icon={cmd.icon}
              title={cmd.name}
              actions={
                <ActionPanel>
                  {cmd.mode === 'view' ? (
                    <Action
                      title="Open Command"
                      onAction={() => openView(cmd)}
                      shortcut={{ code: 'Enter' }}
                    />
                  ) : (
                    <Action
                      title="Run Command"
                      onAction={() => runAction(cmd)}
                      shortcut={{ code: 'Enter' }}
                    />
                  )}
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  )
}
