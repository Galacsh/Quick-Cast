import { useEffect, useRef, useState } from 'react'
import { HomeIcon, ReaderIcon } from '@radix-ui/react-icons'
import Wrapper from '@/components/cmdk/wrapper'
import SearchInput from '@/components/cmdk/search-input'
import Suggestions from '@/components/cmdk/suggestions'
import SuggestionItem from '@/components/cmdk/suggestion-item'
import SuggestionGroup from '@/components/cmdk/suggestion-group'
import Footer from '@/components/cmdk/footer/footer'

export default function RootSearch() {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')

  const searchRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  function focusSearchInput() {
    console.log(searchRef)
    searchRef?.current?.focus()
  }

  function disableSuggestionsScrolling() {
    console.log(suggestionsRef)
    if (suggestionsRef.current) {
      suggestionsRef.current.style.overflow = 'hidden'
    }
  }

  function enableSuggestionsScrolling() {
    console.log(suggestionsRef)
    if (suggestionsRef.current) {
      suggestionsRef.current.style.overflow = ''
    }
  }

  useEffect(focusSearchInput, [])

  return (
    <Wrapper value={value} onValueChange={setValue} className="relative">
      <SearchInput
        ref={searchRef}
        autoFocus
        value={search}
        onValueChange={setSearch}
        placeholder="Search for tabs, bookmarks, histories and commands..."
        className="h-14 px-4 py-2 border-b"
      />
      <Suggestions ref={suggestionsRef} className="flex-1">
        <SuggestionGroup heading={'Commands'}>
          <SuggestionItem
            name="Command 1"
            type="Command"
            extension="Commands"
            icon={HomeIcon}
          />
          <SuggestionItem
            name="Command 2"
            type="Command"
            extension="Commands"
            icon={HomeIcon}
          />
          <SuggestionItem
            name="Command 3"
            type="Command"
            extension="Commands"
            icon={HomeIcon}
          />
        </SuggestionGroup>
        <SuggestionGroup heading={'Tabs'}>
          <SuggestionItem
            name="Tab 1"
            type="Tab"
            extension="Tabs"
            icon={ReaderIcon}
          />
          <SuggestionItem
            name="Tab 2"
            type="Tab"
            extension="Tabs"
            icon={ReaderIcon}
          />
          <SuggestionItem
            name="Tab 3"
            type="Tab"
            extension="Tabs"
            icon={ReaderIcon}
          />
        </SuggestionGroup>
      </Suggestions>
      <Footer
        onOpen={disableSuggestionsScrolling}
        onClose={enableSuggestionsScrolling}
        focusOnPanelClose={focusSearchInput}
      />
    </Wrapper>
  )
}
