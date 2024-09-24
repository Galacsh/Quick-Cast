import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useNavigation } from '@/cast/contexts'
import { cn } from '@/lib/utils'

export default function FooterHeader() {
  const { title } = useNavigation()

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        'text-cmdk-section-title',
        'select-none pointer-events-none'
      )}>
      <ChevronRightIcon className="size-4" />
      {title}
    </div>
  )
}
