import Home from './home'
import Cast from '@/cast'
import { ThemeProvider } from '@/components/theme-provider'

export default function App() {
  return (
    <div className="h-full w-full">
      <ThemeProvider>
        <Cast>
          <Home />
        </Cast>
      </ThemeProvider>
    </div>
  )
}
