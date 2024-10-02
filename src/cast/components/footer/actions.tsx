import FooterButton from './button'
import FooterPopover from './popover'
import { usePanel, useActions } from '@/cast/contexts'
import { cn } from '@/lib/utils'

export default function FooterActions() {
  const { content } = usePanel()
  const { actions, defaultAction } = useActions()

  return (
    <div className={cn('group/fbs', 'flex items-center gap-2')}>
      {defaultAction && (
        <>
          <FooterButton
            text={defaultAction.title}
            shortcut={defaultAction.shortcut}
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
