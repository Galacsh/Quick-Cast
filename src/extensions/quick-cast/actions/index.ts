import { requester } from '@/extensions/utils'

const reload = requester('quick-cast-reload', async () => {
  await chrome.runtime.reload()
})

const optionsPage = requester('quick-cast-open-options-page', async () => {
  await chrome.runtime.openOptionsPage()
})

export const requesters = {
  reloadQuickCast: reload.requester,
  openQuickCastOptionsPage: optionsPage.requester,
}

export const handlers = {
  [reload.id]: reload.handler,
  [optionsPage.id]: optionsPage.handler,
}
