import { useEffect } from 'react'
import FooterButton from './button'
import FooterPopover from './popover'
import { usePanel, useActions } from '@/cast/contexts'
import { isKeystroke } from '@/cast/utils'
import { cn } from '@/lib/utils'

export default function FooterActions() {
  const { content } = usePanel()
  const { actions, defaultAction } = useActions()

  useEffect(() => {
    function onShortcut(e: KeyboardEvent) {
      for (const action of actions) {
        const { isDefault, onAction, shortcut } = action
        if (isDefault || shortcut == null) continue

        if (isKeystroke(shortcut, e)) {
          e.preventDefault()
          e.stopImmediatePropagation()
          onAction()
          return
        }
      }
    }

    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [actions])

  return (
    <div className={cn('group/fbs', 'flex items-center gap-2')}>
      {defaultAction && (
        <>
          <FooterButton
            text={defaultAction.title}
            shortcut={{ code: 'Enter' }}
            onClick={defaultAction.onAction}
          />
          <FooterDivider className="group-hover/fbs:invisible" />
        </>
      )}
      {actions.length > 0 && (
        <FooterPopover
          trigger={
            <FooterButton
              text="Actions"
              shortcut={{ code: 'KeyK', ctrlMeta: true }}
            />
          }>
          {content}
        </FooterPopover>
      )}
    </div>
  )
}

function FooterDivider(props: { className?: string }) {
  return (
    <div
      className={cn(
        'h-2.5 w-0.5',
        'bg-cmdk-background-separator',
        props.className
      )}
    />
  )
}
