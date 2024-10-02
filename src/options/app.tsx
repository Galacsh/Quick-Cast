import { ThemeProvider } from '@/components/theme-provider'
import ThemeOption from './theme'
import { cn } from '@/lib/utils'

export default function App() {
  return (
    <ThemeProvider>
      <div className={cn('container py-4', 'flex flex-col gap-4')}>
        <h1 className={cn('font-extrabold text-xl')}>Quick Cast</h1>
        <ThemeOption />
      </div>
    </ThemeProvider>
  )
}
