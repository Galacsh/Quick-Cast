import { useEffect } from 'react'
import { useCommandState } from 'cmdk'
import { useActions } from '@/cast/contexts'

export default function EmptyWatcher() {
  const count = useCommandState(({ filtered }) => filtered.count)
  const { setActions } = useActions()

  useEffect(() => {
    if (count === 0) {
      setActions([])
    }
  }, [count, setActions])

  return <></>
}
