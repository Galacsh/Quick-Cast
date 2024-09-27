import { List, ActionPanel, Action } from '@/cast/api'
import { useNavigation } from '@/cast/contexts'
import { extensions } from '@/extensions'

export default function Home() {
  const { push } = useNavigation()

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
                      isDefault
                      title="Open Command"
                      onAction={() => push(cmd.view)}
                    />
                  ) : (
                    <Action
                      isDefault
                      title="Run Command"
                      onAction={() => {
                        cmd.action()
                        window.close()
                      }}
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
