import '@types/chrome'

let bypassCacheDefaultSetting = { bypassCache: false }
let refreshAudibleTabsSetting = { refreshAudibleTabs: false }

function setDefaults() {
  chrome.storage.sync.set(bypassCacheDefaultSetting)
  chrome.storage.sync.get(['bypassCache'], function (setting) {
    console.log("Default cache bypass setting set to '%s'", setting.bypassCache)
  })
  chrome.storage.sync.set(refreshAudibleTabsSetting)
  chrome.storage.sync.get(['refreshAudibleTabs'], function (setting) {
    console.log(
      "Default audible tab refresh setting set to '%s'",
      setting.refreshAudibleTabs
    )
  })
}

function getOptions(callback) {
  chrome.storage.sync.get(null, function (localStorageItems) {
    callback(localStorageItems)
  })
}

function refreshAll() {
  getOptions(function (extensionOptions) {
    let queryoptions = { currentWindow: true }
    let reloadProperties = { bypassCache: extensionOptions.bypassCache }

    chrome.tabs.query(queryoptions, function (tabs) {
      for (let i of tabs) {
        if (extensionOptions.refreshAudibleTabs == false) {
          //condition for refreshing only inaudible tabs, when the audible setting is set to false.
          if (i.audible == false) {
            chrome.tabs.reload(i.id!, reloadProperties, () => {
              console.log('refreshed tab id:' + i.id)
            })
          }
        } else {
          //if audible setting is true, refresh all tabs without restriction
          chrome.tabs.reload(
            i.id!,
            reloadProperties,
            () => console.log('refreshed tab id:' + i.id)
          )
        }
      }
    })
  })
}

chrome.runtime.onInstalled.addListener(setDefaults)

chrome.action.onClicked.addListener(refreshAll)

chrome.commands.onCommand.addListener(refreshAll)
