let commands = {
  "base64decode": base64decode,
  "base64encode": base64encode,
  "bin2dec": bin2dec,
  "bin2hex": bin2hex,
  "bin2oct": bin2oct,
  "bin2txt": bin2txt,
  "dec2bin": dec2bin,
  "dec2hex": dec2hex,
  "dec2oct": dec2oct,
  "disemvowel": disemvowel,
  "entityDecode": entityDecode,
  "entityEncode": entityEncode,
  "hex2bin": hex2bin,
  "hex2dec": hex2dec,
  "hex2oct": hex2oct,
  "hex2oct": oct2hex,
  "hex2txt": hex2txt,
  "oct2bin": oct2bin,
  "oct2dec": oct2dec,
  "removeSpaces": removespaces,
  "reverse": reverse,
  "rot13": rot13,
  "timestampDecode": timestampDecode,
  "timestampEncode": timestampEncode,
  "txt2bin": txt2bin,
  "txt2hex": txt2hex,
  "urlDecode": urlDecode,
  "urlEncode": urlEncode
};


function applyTextarea(cmd, textarea) {
  let start = textarea.selectionStart;
  let end = textarea.selectionEnd;

  let text = textarea.value;
  let oldText = text.substring(start, end);
  let newText = cmd(oldText.toString());

  textarea.value = text.substring(0, start) + newText + text.substring(end);

  // Set selection back to its original position
  textarea.selectionStart = start;
  textarea.selectionEnd = end + newText.length - oldText.length;
}


function applyTextNodes(cmd, selection) {
  let seenNodes = [];

  for (let r = 0; r < selection.rangeCount; ++r) {
    let range = selection.getRangeAt(r);
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;

    let selectedTextNodes = document.createNodeIterator(
      range.commonAncestorContainer, NodeFilter.SHOW_TEXT, function(n) {
        if (!selection.containsNode(n, true)) {
          return NodeFilter.FILTER_REJECT;
        }

        // We don't want to change <style> and <script> elements
        let parent = n.parentNode.nodeName.toLowerCase();
        if (parent === "style" || parent === "script") {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    );

    let node;
    while (node = selectedTextNodes.nextNode()) {
      // The same text node might be encountered in multiple ranges, but we only
      // want to process each one once.
      if (seenNodes.includes(node)) {
        continue;
      }
      seenNodes.push(node);

      let start = (node == range.startContainer ? startOffset : 0);
      let end   = (node == range.endContainer ? endOffset : Infinity);

      let text = node.nodeValue;
      let oldText = text.slice(start, end);
      let newText = cmd(oldText);

      node.nodeValue = text.slice(0, start) + newText + text.slice(end);
      if (node == range.endContainer) {
        endOffset += newText.length - oldText.length;
      }
    }

    // Set selection back to its original position
    range.setStart(range.startContainer, startOffset);
    range.setEnd(range.endContainer, endOffset);
  }
}


browser.runtime.onMessage.addListener((message) => {
  let cmd = commands[message.command];
  if (!cmd) {
    console.error("Cryptext: unrecognized command name: " + JSON.stringify(message.command));
    return;
  }

  let textarea = false;
  if (document.activeElement) {
    let tagname = document.activeElement.tagName.toLowerCase();
    if (tagname === "textarea" || tagname === "input") {
      textarea = true;
    }
  }

  if (textarea) {
    applyTextarea(cmd, document.activeElement);
  }
  else {
    applyTextNodes(cmd, window.getSelection());
  }
});
