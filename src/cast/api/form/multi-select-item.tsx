import { CommandItem } from 'cmdk'
import { v4 as uuid } from 'uuid'
import { cn } from '@/lib/utils'
import { FormMultiSelectItemProps } from '@/cast/types'
import { CircleCheck, Circle } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

export default function MultiSelectItem({
  title,
  subtitle,
  onSelect,
  onDeselect,
  keywords,
  accessories,
  className,
}: FormMultiSelectItemProps) {
  const id = useRef<string>(uuid())
  const [isSelected, setSelected] = useState(false)

  const onSelectItem = useCallback(() => {
    if (isSelected) {
      setSelected(false)
      if (onDeselect) onDeselect()
    } else {
      setSelected(true)
      if (onSelect) onSelect()
    }
  }, [isSelected, onDeselect, onSelect])

  return (
    <CommandItem
      value={id.current}
      keywords={keywords ? [title, ...keywords] : [title]}
      onSelect={onSelectItem}
      className={cn(
        'h-10 w-full max-w-full px-2',
        'flex items-center justify-between gap-3',
        'cursor-pointer select-none',
        'text-sm',
        'rounded-md',
        'aria-selected:bg-cmdk-background-accent',
        className
      )}>
      <div className="max-w-full flex items-center gap-3 min-w-0">
        <div className="size-[1.125rem] flex items-center justify-center shrink-0">
          {isSelected ? (
            <CircleCheck className="size-4 text-teal-600 dark:text-teal-400" />
          ) : (
            <Circle className="size-4 text-cmdk-section-title" />
          )}
        </div>
        <span className="text-foreground truncate max-w-full flex-grow">
          {title}
        </span>
        {subtitle && (
          <span className="text-cmdk-placeholder whitespace-nowrap">
            {subtitle}
          </span>
        )}
      </div>
      {accessories && <div className="shrink-0">{accessories}</div>}
    </CommandItem>
  )
}
