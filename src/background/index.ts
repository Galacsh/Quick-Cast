import { name, version } from '@/../package.json'

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
    notifyVersionUpdate(detail.previousVersion, version)
  } else {
    notifyInstallation(name)
    openOptionsPage()
  }
}

// ======================================================

chrome.runtime.onInstalled.addListener(onInstallOrUpdate)
