import { ThemeProvider } from '@/components/theme-provider'
import RootSearch from '@/components/cmdk/root-search'

export default function App() {
  return (
    <ThemeProvider>
      <div className="w-cmdk max-w-full h-cmdk max-h-full">
        <RootSearch />
      </div>
    </ThemeProvider>
  )
}
