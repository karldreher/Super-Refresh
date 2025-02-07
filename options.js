function html_val_to_bool(value) {
  //seems like a bad idea, but <setting> value cannot be bool and would pass "true" to JS as a string.
  if (value == 'On') {
    bool = true
  } else if (value == 'Off') {
    bool = false
  }
  return bool
}

function bool_to_html(bool) {
  //see comments for html_val_to_bool.
  if (bool == true) {
    return 'On'
  } else if (bool == false) {
    return 'Off'
  }
}

function save_options() {
  var bypassCacheSetting = html_val_to_bool(
    document.getElementById('bypasscache').value
  )
  var refreshAudibleTabsSetting = html_val_to_bool(
    document.getElementById('audible').value
  )
  chrome.storage.local.set(
    {
      bypassCache: bypassCacheSetting,
      refreshAudibleTabs: refreshAudibleTabsSetting,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status')
      status.textContent = 'Options saved.'
      setTimeout(function () {
        status.textContent = ''
      }, 750)
    }
  )
}

function restore_options() {
  chrome.storage.local.get(null, function (items) {
    document.getElementById('bypasscache').value = bool_to_html(
      items.bypassCache
    )
    document.getElementById('audible').value = bool_to_html(
      items.refreshAudibleTabs
    )
  })
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
