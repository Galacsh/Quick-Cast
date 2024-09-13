import { cn } from '@/lib/utils'

export default function Shortcut(props: {
  keys: string[]
  className?: string
  keysClassName?: string
}) {
  return (
    <div className={cn('flex gap-0.5', props.className)}>
      {props.keys &&
        props.keys.map((key, idx) => (
          <kbd
            key={idx}
            className={cn(
              'size-5 px-2 py-1',
              'flex items-center justify-center',
              'text-cmdk-kbd bg-cmdk-background-kbd',
              'group-aria-selected:text-cmdk-kbd-accent group-aria-selected:bg-cmdk-background-kbd-accent',
              'group-hover:text-cmdk-kbd-accent group-hover:bg-cmdk-background-kbd-accent',
              'rounded-sm',
              props.keysClassName
            )}>
            {key}
          </kbd>
        ))}
    </div>
  )
}
