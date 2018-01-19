document.history = [];
document.undoHistory = [];

var textbox = document.querySelector("#text");
textbox.addEventListener('keyup', countChars, false);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cipher")) {
    chosenCipher = e.target.value;
  }
  else if (e.target.classList.contains("submit")) {
    plaintext = document.getElementById('text').value;
    key = document.getElementById('key').value;
    addHistory(plaintext);
    var ciphertext;
    switch (chosenCipher) {
      case "Base64 encode":
        ciphertext = base64encode(plaintext);
        break;
      case "Base64 decode":
        ciphertext = base64decode(plaintext);
        break;
      case "Disemvowel":
        ciphertext = disemowel(plaintext);
        break;
      case "HTML entities encode":
        ciphertext = entityEncode(plaintext);
        break;
      case "HTML entities decode":
        ciphertext = entityDecode(plaintext);
        break;
      case "Remove spaces":
        ciphertext = removespaces(plaintext);
        break;
      case "Reverse":
        ciphertext = reverse(plaintext);
        break;
      case "ROT13":
        ciphertext = rot13(plaintext);
        break;
      case "Timestamp encode":
        ciphertext = timestampEncode(plaintext);
        break;
      case "Timestamp decode":
        ciphertext = timestampDecode(plaintext);
        break;
      case "URL encode":
        ciphertext = urlEncode(plaintext);
        break;
      case "URL decode":
        ciphertext = urlDecode(plaintext);
        break;
      case "XOR encrypt/decrypt":
        ciphertext = xor(plaintext, key);
        break;
      case "ASCII to binary":
        ciphertext = txt2bin(plaintext);
        break;
      case "ASCII to hex":
        ciphertext = txt2hex(plaintext);
        break;
      case "Binary to ASCII":
        ciphertext = bin2txt(plaintext);
        break;
      case "Binary to decimal":
        ciphertext = bin2dec(plaintext);
        break;
      case "Binary to hex":
        ciphertext = bin2hex(plaintext);
        break;
      case "Binary to octal":
        ciphertext = bin2oct(plaintext);
        break;
      case "Decimal to binary":
        ciphertext = dec2bin(plaintext);
        break;
      case "Decimal to hex":
        ciphertext = dec2hex(plaintext);
        break;
      case "Decimal to octal":
        ciphertext = dec2oct(plaintext);
        break;
      case "Hex to ASCII":
        ciphertext = hex2txt(plaintext);
        break;
      case "Hex to binary":
        ciphertext = hex2bin(plaintext);
        break;
      case "Hex to decimal":
        ciphertext = hex2dec(plaintext);
        break;
      case "Hex to octal":
        ciphertext = hex2oct(plaintext);
        break;
      case "Octal to binary":
        ciphertext = oct2bin(plaintext);
        break;
      case "Octal to decimal":
        ciphertext = oct2dec(plaintext);
        break;
      case "Octal to hex":
        ciphertext = oct2hex(plaintext);
        break;
      default:
        break;
    }
    document.getElementById('text').value = ciphertext;
    countChars();
  }
  else if (e.target.classList.contains("copy")) {
    var copyText = document.querySelector("#text");
    copyText.select();
    document.execCommand("copy");
  }
  else if (e.target.classList.contains("undo")) {
    if (document.history.length > 0) {
      document.undoHistory.push(document.getElementById('text').value);
      document.getElementById('text').value = undo();
      countChars();
    }
  }
  else if (e.target.classList.contains("redo")) {
    if (document.undoHistory.length > 0) {
      addHistory(document.getElementById('text').value);
      document.getElementById('text').value = redo();
      countChars();
    }
  }
});

function addHistory(str) {
  document.history.push(str);
}

function undo() {
  return document.history.pop();
}

function redo() {
  return document.undoHistory.pop();
}
