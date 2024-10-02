import { useMain, useNavigation } from '@/cast/contexts'
import { cn } from '@/lib/utils'

export default function Main() {
  const { ref } = useMain()
  const { view } = useNavigation()

  return (
    <div
      ref={ref}
      className={cn(
        'w-cmdk max-w-full h-cmdk-body max-h-cmdk-body',
        'overflow-hidden'
      )}>
      {view}
    </div>
  )
}
