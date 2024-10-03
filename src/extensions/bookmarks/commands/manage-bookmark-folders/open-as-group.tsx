import { Action, ActionPanel, Form } from '@/cast/api'
import type { BookmarkNode } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { requesters } from '../../actions'

type Props = {
  folder: BookmarkNode
}

export default function OpenAsGroup({ folder }: Props) {
  const [groupName, setGroupName] = useState(folder.title)
  const [groupNameError, setGroupNameError] = useState('')

  const onSubmit = useCallback(async () => {
    if (groupNameError) return
    await requesters.openAsGroup({ bookmark: folder, title: groupName })
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
