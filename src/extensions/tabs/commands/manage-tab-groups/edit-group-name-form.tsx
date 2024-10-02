import { useCallback, useEffect, useState } from 'react'
import { Form, Action, ActionPanel } from '@/cast/api'
import { requesters } from '../../actions'
import type { TabGroup } from '@/types'

type Props = {
  tabGroup: TabGroup
}

export default function EditGroupNameForm({ tabGroup }: Props) {
  const [name, setName] = useState(tabGroup.title || '')
  const [nameError, setNameError] = useState('')

  // validation
  useEffect(() => {
    if (name === '') {
      setNameError('Group name is empty.')
    } else {
      setNameError('')
    }
  }, [name])

  // submit form
  const submitForm = useCallback(async () => {
    if (name === '') return
    await requesters.editTabGroupName({ name, tabGroup })
    window.close()
  }, [name, tabGroup])

  return (
    <Form
      navigationTitle="Edit group name"
      actions={
        <ActionPanel>
          <Action
            title="Submit"
            onAction={submitForm}
            shortcut={{ code: 'Enter', ctrlMeta: true }}
          />
        </ActionPanel>
      }>
      <Form.TextField
        autoFocus
        title="Group name"
        placeholder="Type group name..."
        error={nameError}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Form>
  )
}
