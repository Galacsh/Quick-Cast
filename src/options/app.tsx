import { ThemeProvider } from '@/components/theme-provider'
import ThemeOption from './theme'

export default function App() {
  return (
    <ThemeProvider>
      <ThemeOption />
    </ThemeProvider>
  )
}
