
function refreshAll() {
	chrome.tabs.query({
		currentWindow: true
	},
		function (tabs) {
			for (i of tabs) {
				chrome.tabs.reload(i.id, { bypassCache: false }, console.log("refreshed tab id:" + i.id))
			}
		}
	)
}

chrome.browserAction.onClicked.addListener(refreshAll)

chrome.commands.onCommand.addListener(refreshAll);