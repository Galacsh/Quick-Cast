import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, Form } from '@/cast/api'
import { bookmark as request } from '@/extensions/actions'
import { useNavigation } from '@/cast/contexts'

export default function CreateForm() {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [nameError, setNameError] = useState('')
  const [urlError, setUrlError] = useState('')

  const { pop } = useNavigation()

  const onSubmit = useCallback(async () => {
    if (nameError || urlError) return

    await request.create({ title: name, url })
    pop()
  }, [name, nameError, pop, url, urlError])

  useEffect(() => {
    chrome.tabs.query({ active: true }).then((tabs) => {
      const found = tabs.at(0)
      if (found) {
        const { title = '', url = '' } = found
        setName(title)
        setUrl(url)
      }
    })
  }, [])

  useEffect(() => {
    if (name === '') {
      setNameError('Bookmark name cannot be empty.')
    } else {
      setNameError('')
    }
  }, [name])

  useEffect(() => {
    if (url === '') {
      setUrlError('Bookmark URL cannot be empty.')
    } else {
      setUrlError('')
    }
  }, [url])

  return (
    <Form
      navigationTitle="Create Bookmark"
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
        placeholder="Type bookmark name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
      />
      <Form.TextField
        title="URL"
        placeholder="Type bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={urlError}
      />
    </Form>
  )
}
