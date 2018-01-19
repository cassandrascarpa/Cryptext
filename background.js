var currentFunction = "";

browser.storage.local.get("contextmenuhidden", function(items){
  if(items.contextmenuhidden) {
  let cmHidden = JSON.stringify(items.contextmenuhidden).replace(/['"]+/g, '');
  if (cmHidden == "false") {
    createMenuItem();
  }}
  else { createMenuItem(); }
});

function createMenuItem() {

browser.contextMenus.create({
  id: "openCryptext",
  title: "Open Cryptext",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "separator-0",
  type: "separator",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "base64encode",
  title: "Base 64 encode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "base64decode",
  title: "Base 64 decode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "disemvowel",
  title: "Disemvowel",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "entityEncode",
  title: "HTML entities encode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "entityDecode",
  title: "HTML entities decode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "removeSpaces",
  title: "Remove spaces",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "reverse",
  title: "Reverse",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "rot13",
  title: "ROT13",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "timestampEncode",
  title: "Timestamp encode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "timestampDecode",
  title: "Timestamp decode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "urlEncode",
  title: "URL encode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "urlDecode",
  title: "URL decode",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "txt2bin",
  title: "ASCII to binary",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "txt2hex",
  title: "ASCII to hex",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "bin2txt",
  title: "Binary to ASCII",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "bin2dec",
  title: "Binary to decimal",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "bin2hex",
  title: "Binary to hex",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "bin2oct",
  title: "Binary to octal",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "dec2bin",
  title: "Decimal to binary",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "dec2hex",
  title: "Decimal to hex",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "dec2oct",
  title: "Decimal to octal",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "hex2txt",
  title: "Hex to ASCII",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "hex2bin",
  title: "Hex to binary",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "hex2dec",
  title: "Hex to decimal",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "hex2oct",
  title: "Hex to octal",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "oct2bin",
  title: "Octal to binary",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "oct2dec",
  title: "Octal to decimal",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "oct2hex",
  title: "Octal to hex",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  let mId = info.menuItemId.toString();
  switch (info.menuItemId) {
    case "openCryptext":
      var popupURL = browser.extension.getURL("panel/panel.html");
      browser.windows.create({
        url: popupURL,
        type: "panel",
        height: 400,
        width: 800
      });
      break;
    default:
      currentFunction = info.menuItemId.toString();
      msgTab();
      break;
  }
});
}

function msgTab() {
  let querying = browser.tabs.query({currentWindow: true, active: true});
  querying.then(sendMsg);
}

function sendMsg(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: currentFunction,
   });
}
