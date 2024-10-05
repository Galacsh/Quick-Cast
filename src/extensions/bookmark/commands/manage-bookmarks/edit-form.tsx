import { useCallback, useEffect, useState } from 'react'
import { Action, ActionPanel, Form } from '@/cast/api'
import { bookmark as request } from '@/extensions/actions'
import { useNavigation } from '@/cast/contexts'
import type { BookmarkNode } from '@/types'

type Props = {
  bookmark: BookmarkNode
}

export default function EditForm({ bookmark }: Props) {
  const [name, setName] = useState(bookmark.title)
  const [url, setUrl] = useState(bookmark.url || '')
  const [nameError, setNameError] = useState('')
  const [urlError, setUrlError] = useState('')

  const { pop } = useNavigation()

  const onSubmit = useCallback(async () => {
    if (nameError || urlError) return

    const edited = Object.assign({}, bookmark, { title: name, url })
    await request.edit({ bookmark: edited })
    pop()
  }, [bookmark, name, nameError, pop, url, urlError])

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
      navigationTitle={`Edit "${bookmark.title}"`}
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
