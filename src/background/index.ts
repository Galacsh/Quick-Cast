import { name, version } from '@/../package.json'
import { handlers } from '@/extensions/handlers'
import type { MessageSender, Message, Handler, SendResponse } from '@/types'

function openOptionsPage() {
  chrome.runtime.openOptionsPage()
}

function notifyVersionUpdate(previousVersion: string, currentVersion: string) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon-48.png',
    title: name,
    message: `Successfully updated version from ${previousVersion} to ${currentVersion}.`,
  })
}

function notifyInstallation(extensionName: string) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon-48.png',
    title: extensionName,
    message: `Successfully installed ${extensionName}.`,
  })
}

function onInstallOrUpdate(detail: chrome.runtime.InstalledDetails) {
  if (detail.previousVersion) {
    if (detail.previousVersion !== version) {
      notifyVersionUpdate(detail.previousVersion, version)
    }
  } else {
    notifyInstallation(name)
    openOptionsPage()
  }
}

function onConnect() {
  console.log(`Connected - ${new Date().toLocaleString()}`)
}

function onAction(
  message: Message<unknown>,
  _: MessageSender,
  sendResponse: SendResponse
) {
  type HandlerId = keyof typeof handlers
  const id = message.id as HandlerId

  const handler = handlers[id]

  try {
    if ('payload' in message) {
      // treat handler as a payload handler
      type PayloadHandler = Handler<(p: unknown) => Promise<unknown>>
      const withPayload = handler as PayloadHandler

      // run handler and send response
      withPayload(message.payload).then((handled) => {
        if (handled != null) sendResponse({ status: 'ok', data: handled })
        else sendResponse({ status: 'ok' })
      })
    } else {
      // treat handler as a handler without payload
      type NoPayloadHandler = Handler<(p: void) => Promise<unknown>>
      const withoutPayload = handler as NoPayloadHandler

      // run handler and send response
      withoutPayload().then((handled) => {
        if (handled != null) sendResponse({ status: 'ok', data: handled })
        else sendResponse({ status: 'ok' })
      })
    }
  } catch (e) {
    sendResponse({
      status: 'fail',
      error: (e as Error).message,
    })
  }

  return true
}

// ======================================================

chrome.runtime.onConnect.addListener(onConnect)
chrome.runtime.onInstalled.addListener(onInstallOrUpdate)
chrome.runtime.onMessage.addListener(onAction)
