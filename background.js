function setDefaults() {
  const defaults = [
    { bypassCache: false },
    { includeActiveTab: true },
    { refreshAudibleTabs: false },
  ];
  defaults.forEach((setting) => chrome.storage.local.set(setting));

  chrome.storage.local.get(["bypassCache"], function (setting) {
    console.log(
      "Default cache bypass setting set to '%s'",
      setting.bypassCache
    );
  });
  chrome.storage.local.get(["includeActiveTab"], function (setting) {
    console.log(
      "Default include active tab setting set to '%s'",
      setting.includeActiveTab
    );
  });
  chrome.storage.local.get(["refreshAudibleTabs"], function (setting) {
    console.log(
      "Default audible tab refresh setting set to '%s'",
      setting.refreshAudibleTabs
    );
  });
}

function getOptions(callback) {
  chrome.storage.local.get(null, function (localStorageItems) {
    callback(localStorageItems);
  });
}

function refreshAll() {
  getOptions(function (extensionOptions) {
    let queryoptions = { currentWindow: true };
    let reloadProperties = { bypassCache: extensionOptions.bypassCache };

    chrome.tabs.query(queryoptions, function (tabs) {
      if (extensionOptions.refreshAudibleTabs == false) {
        tabs = tabs.filter((tab) => tab.audible != true);
      }
      if (extensionOptions.includeActiveTab == false) {
        tabs = tabs.filter((tab) => tab.active != true);
      }
      for (i of tabs) {
        chrome.tabs.reload(
          i.id,
          reloadProperties,
          console.log("refreshed tab id:" + i.id)
        );
      }
    });
  });
}

chrome.runtime.onInstalled.addListener(setDefaults);

chrome.action.onClicked.addListener(refreshAll);

chrome.commands.onCommand.addListener(refreshAll);
