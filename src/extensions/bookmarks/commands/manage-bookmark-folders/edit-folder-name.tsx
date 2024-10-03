import { Action, ActionPanel, Form } from '@/cast/api'
import type { BookmarkNode } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { requesters } from '../../actions'
import { useNavigation } from '@/cast/contexts'

type Props = {
  folder: BookmarkNode
}

export default function EditFolderName({ folder }: Props) {
  const [folderName, setFolderName] = useState(folder.title)
  const [folderNameError, setFolderNameError] = useState('')

  const { pop } = useNavigation()

  const onSubmit = useCallback(async () => {
    if (folderNameError) return
    await requesters.editBookmarkFolder({ folder, title: folderName })
    pop()
  }, [folder, folderName, folderNameError, pop])

  useEffect(() => {
    if (folderName === '') {
      setFolderNameError('Folder name cannot be empty.')
    } else {
      setFolderNameError('')
    }
  }, [folderName])

  return (
    <Form
      navigationTitle={`Edit name of "${folder.title}"`}
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
        title="Folder name"
        placeholder="Type folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        error={folderNameError}
      />
    </Form>
  )
}
