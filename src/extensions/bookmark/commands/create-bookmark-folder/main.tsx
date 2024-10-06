import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, Form } from '@/cast/api'
import { bookmark as request } from '@/extensions/actions'
import { useNavigation } from '@/cast/contexts'

export default function CreateForm() {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  const { pop } = useNavigation()

  const onSubmit = useCallback(async () => {
    if (nameError) return

    await request.createFolder({ title: name })
    pop()
  }, [name, nameError, pop])

  useEffect(() => {
    if (name === '') {
      setNameError('Bookmark folder name cannot be empty.')
    } else {
      setNameError('')
    }
  }, [name])

  return (
    <Form
      navigationTitle="Create Bookmark Folder"
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
        title="Name"
        placeholder="Type bookmark folder name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
      />
    </Form>
  )
}
