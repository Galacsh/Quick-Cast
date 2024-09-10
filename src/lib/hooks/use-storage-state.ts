import {
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from 'react'

type StorageChangeRecord = {
  [key: string]: chrome.storage.StorageChange
}

/** Same with `React.useState` but syncs with `chrome.storage.sync`. */
export function useStorageState<T>(
  keyName: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, _setState] = useState<T>(defaultValue)

  // Load initial value
  useEffect(() => {
    const query = defaultValue == null ? keyName : { [keyName]: defaultValue }
    chrome.storage.sync
      .get(query)
      .then(({ [keyName]: value }) => _setState(value))
  }, [defaultValue, keyName])

  // On storage change, pass the new value to state
  useEffect(() => {
    function onChangeListener(change: StorageChangeRecord) {
      if (change[keyName] != null && change[keyName].newValue != null) {
        _setState(change[keyName].newValue)
      }
    }

    chrome.storage.sync.onChanged.addListener(onChangeListener)
    return () => chrome.storage.sync.onChanged.removeListener(onChangeListener)
  }, [defaultValue, keyName])

  // update storage value instead of updating state value directly
  const setState: typeof _setState = useCallback(
    (action) => {
      const val =
        typeof action === 'function'
          ? (action as (prev: T | undefined) => T | undefined)(state)
          : action

      chrome.storage.sync.set({ [keyName]: val })
    },

    [keyName, state]
  )

  return [state, setState]
}
