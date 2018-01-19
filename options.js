let checkbox = document.querySelector("#hidecontextmenu");

function storeSettings() {
  let hidden = checkbox.checked;
  browser.storage.local.set({
    contextmenuhidden: hidden
  });
}

function setCurrentChoice(result) {
    let rstring = JSON.stringify(result.contextmenuhidden).replace(/['"]+/g, '');
    if (rstring == "true") {
      checkbox.checked = true;
    }
    else {
      rstring = "false";
      browser.storage.local.set({
        contextmenuhidden: false
      });
    }
  }

browser.storage.local.get("contextmenuhidden").then(setCurrentChoice);
checkbox.addEventListener("change", storeSettings);
