import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/hooks/use-theme'
import { cn } from '@/lib/utils'

export default function ThemeOption() {
  const { theme, setTheme } = useTheme()
  return (
    <div className={cn('flex flex-col gap-3')}>
      <div>
        <h2 className="font-bold text-lg">Theme Options</h2>
      </div>
      <div className="text-sm text-foreground/70">
        <span className="mr-2">Current theme:</span>
        <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={() => setTheme('light')}>Light</Button>
        <Button onClick={() => setTheme('dark')}>Dark</Button>
        <Button onClick={() => setTheme('system')}>System</Button>
      </div>
    </div>
  )
}
