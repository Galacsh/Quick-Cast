import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, Form } from '@/cast/api'
import { bookmark as request } from '@/extensions/actions'
import type { BookmarkNode } from '@/types'

type Props = {
  folder: BookmarkNode
}

export default function OpenAsGroup({ folder }: Props) {
  const [groupName, setGroupName] = useState(folder.title)
  const [groupNameError, setGroupNameError] = useState('')

  const onSubmit = useCallback(async () => {
    if (groupNameError) return
    await request.openFolderAsGroup({ folder, title: groupName })
    window.close()
  }, [folder, groupName, groupNameError])

  useEffect(() => {
    if (groupName === '') {
      setGroupNameError('Group name cannot be empty.')
    } else {
      setGroupNameError('')
    }
  }, [groupName])

  return (
    <Form
      navigationTitle={`Open "${folder.title}" as group`}
      actions={
        <ActionPanel>
          <Action
            title="Submit"
            onAction={onSubmit}
            shortcut={{ code: 'Enter' }}
          />
        </ActionPanel>
      }>
      <Form.TextField
        autoFocus
        title="Group name"
        placeholder="Type group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        error={groupNameError}
      />
    </Form>
  )
}
