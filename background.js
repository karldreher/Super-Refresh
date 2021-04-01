let bypassCacheDefaultSetting = { 'bypassCacheOption': false };

function setDefaults() {
	chrome.storage.local.set(bypassCacheDefaultSetting);
	chrome.storage.local.get(['bypassCacheOption'],
		function (setting) {
			console.log('Default cache bypass setting set to \'%s\'', setting.bypassCacheOption)
		}
	)
}

function refreshAll() {
	chrome.storage.local.get(['bypassCacheOption'],
		function (bypassCacheOption) {
			chrome.tabs.query({
				currentWindow: true
			},
				function (tabs) {
					for (i of tabs) {
						chrome.tabs.reload(i.id, { bypassCache: bypassCacheOption['bypassCacheOption'] }, console.log("refreshed tab id:" + i.id))
					}
				}
			)
		}
	)
}


chrome.runtime.onInstalled.addListener(setDefaults);

chrome.browserAction.onClicked.addListener(refreshAll);

chrome.commands.onCommand.addListener(refreshAll)


