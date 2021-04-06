let bypassCacheDefaultSetting = { 'bypassCache': false };
let queryAudibleTabsSetting = { 'queryAudibleTabs': false }

function setDefaults() {
	chrome.storage.local.set(bypassCacheDefaultSetting);
	chrome.storage.local.get(['bypassCache'],
		function (setting) {
			console.log('Default cache bypass setting set to \'%s\'', setting.bypassCache)
		}
	);
	chrome.storage.local.set(queryAudibleTabsSetting);
	chrome.storage.local.get(['queryAudibleTabs'],
		function (setting) {
			console.log('Default audible tab query setting set to \'%s\'', setting.queryAudibleTabs)
		}
	)
}

function getOptions(callback) {
	chrome.storage.local.get(null, function (localStorageItems) {
		callback(localStorageItems)
	}
	)

}

function refreshAll() {
	getOptions(function (extensionOptions) {
		
		let queryoptions = { currentWindow: true, audible: extensionOptions.queryAudibleTabs }
		let reloadProperties = { bypassCache: extensionOptions.bypassCache }

		chrome.tabs.query(queryoptions,
			function (tabs) {
				for (i of tabs) {
					chrome.tabs.reload(i.id, reloadProperties, console.log("refreshed tab id:" + i.id))
				}
			}
		)
	}
	)
}


chrome.runtime.onInstalled.addListener(setDefaults);

chrome.browserAction.onClicked.addListener(refreshAll);

chrome.commands.onCommand.addListener(refreshAll)


