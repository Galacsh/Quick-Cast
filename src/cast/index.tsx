import { type ReactNode } from 'react'
import {
  ActionProvider,
  MainProvider,
  NavigationProvider,
  PanelProvider,
  SearchProvider,
} from './contexts'
import { Main, Footer } from './components'

type CastProps = {
  children?: ReactNode
}

export default function Cast({ children }: CastProps) {
  return (
    <NavigationProvider home={children}>
      <MainProvider>
        <PanelProvider>
          <SearchProvider>
            <ActionProvider>
              <Main />
              <Footer />
            </ActionProvider>
          </SearchProvider>
        </PanelProvider>
      </MainProvider>
    </NavigationProvider>
  )
}
