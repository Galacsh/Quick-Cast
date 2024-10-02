import { useEffect } from 'react'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useActions, useNavigation, usePanel } from '@/cast/contexts'
import TextField from './text-field'
import MultiSelect from './multi-select'
import MultiSelectItem from './multi-select-item'
import { toActions } from '@/cast/utils'
import { cn } from '@/lib/utils'
import type { FormProps } from '@/cast/types'

function Form({
  navigationTitle,
  actions: ActionPanel,
  className,
  children,
}: FormProps) {
  const { setActions } = useActions()
  const { pop, isRoot, setTitle } = useNavigation()
  const { setContent, isPanelOpen } = usePanel()

  // set navigation title
  useEffect(() => {
    setTitle(navigationTitle)
  }, [navigationTitle, setTitle])

  // set action panel and update available actions
  useEffect(() => {
    setContent(ActionPanel)
    setActions(toActions(ActionPanel))
  }, [ActionPanel, setActions, setContent])

  // pop view on keydown `Escape`
  useEffect(() => {
    function previous(e: KeyboardEvent) {
      if (isPanelOpen) return

      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        e.preventDefault()
        pop()
      }
    }

    window.addEventListener('keydown', previous)
    return () => window.removeEventListener('keydown', previous)
  }, [isPanelOpen, pop])

  return (
    <div
      className={cn(
        'h-full w-full',
        'text-foreground bg-background outline-none',
        className
      )}>
      <div
        className={cn(
          'h-14 px-4',
          'flex items-center gap-2',
          'border-b border-cmdk-background-separator'
        )}>
        {!isRoot() && (
          <button
            type="button"
            tabIndex={-1}
            onClick={pop}
            className={cn(
              'size-6 shrink-0 rounded-md',
              'inline-flex items-center justify-center',
              'bg-cmdk-background-kbd hover:bg-cmdk-background-kbd-accent',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
            )}>
            <ArrowLeftIcon className="size-4" />
          </button>
        )}
        <span className="text-sm font-bold">{navigationTitle}</span>
      </div>
      <div
        className={cn(
          'w-full max-h-[calc(100%-3.5rem)] p-4',
          'flex flex-col gap-3',
          'overflow-x-hidden overflow-y-auto overscroll-contain',
          '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:bg-transparent',
          '[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track:hover]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/20'
        )}>
        {children}
      </div>
    </div>
  )
}

Form.TextField = TextField
Form.MultiSelect = MultiSelect
Form.MultiSelectItem = MultiSelectItem

export default Form
