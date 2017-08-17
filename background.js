browser.contextMenus.create({
  id: "Encrypt/decrypt",
  title: "Encrypt/decrypt",
  contexts: ["all"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "Encrypt/decrypt":
      var popupURL = browser.extension.getURL("panel/panel.html");
      browser.windows.create({
        url: popupURL,
        type: "panel",
        height: 400,
        width: 800
      });
      break;
  }
})
