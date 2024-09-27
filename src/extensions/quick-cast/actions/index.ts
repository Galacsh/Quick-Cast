import { requester } from '@/extensions/utils'

const reload = requester('reload-quick-cast', async () => {
  await chrome.runtime.reload()
})

const optionsPage = requester('open-quick-cast-options-page', async () => {
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
