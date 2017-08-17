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
      case "Decimal to binary":
        ciphertext = dec2bin(plaintext);
        break;
      case "Decimal to hex":
        ciphertext = dec2hex(plaintext);
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

function base64encode(plaintext) {
  return btoa(encodeURIComponent(plaintext).replace(/%([0-9A-F]{2})/g,
       function toSolidBytes(match, p1) {
           return String.fromCharCode('0x' + p1);
   }));
}

function base64decode(plaintext) {
  return decodeURIComponent(atob(plaintext).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function countChars() {
  document.getElementById('count').textContent = "Character count: " + document.getElementById('text').value.length;
  return "";
}

function entityEncode(plaintext) {
			var entityStr = "";
			for (i = 0; i < plaintext.length; i++) {
        if (/[^a-zA-Z\d\s]/.test(plaintext[i])) {
          entityStr += "&#" + plaintext.charCodeAt(i) + ";";
        }
        else {
          entityStr += plaintext[i];
        }
			}
			return entityStr;
}

function entityDecode(plaintext) {
			return plaintext.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
}

function removespaces(plaintext) {
  return plaintext.split(' ').join('');
}

function reverse(plaintext) {
  return plaintext.split("").reverse().join("");
}

function rot13(plaintext) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var rotated = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
  var rottxt = "";
  for (i=0; i < plaintext.length; i++) {
    char = plaintext.substring(i, i+1);
    if (char.match(/[a-z]/i)) {
      rottxt += rotated.charAt(alphabet.indexOf(char));
    }
    else {
      rottxt += char;
    }
  }
  return rottxt;
}

function timestampEncode(plaintext) {
  var date = new Date(plaintext.toString());
  var timestamp = date.getTime()/1000.0;
  if (!isNaN(timestamp)) {
    return timestamp;
  }
  return plaintext;
}

function timestampDecode(plaintext) {
  var date = new Date(plaintext *1000);
  return date.toGMTString()+" "+date.toLocaleString();
}

function urlEncode(plaintext) {
   return encodeURIComponent(plaintext);
}

function urlDecode(plaintext) {
  return decodeURIComponent(plaintext);
}

function xor(plaintext, key) {
  var xored = "";
  if (key.length > 0) {
    while (key.length < plaintext.length) {
      key += key;
    }
    for (i=0; i < plaintext.length; i++) {
      xored += String.fromCharCode(plaintext.charCodeAt(i) ^ key.charCodeAt(i));
    }
    return xored;
  }
  return plaintext;
}

function txt2bin(plaintext) {
  return hex2bin(txt2hex(plaintext));
}

function txt2hex(plaintext) {
  var hexStr = "";
  for (i = 0; i < plaintext.length; i++) {
    hexStr += plaintext.charCodeAt(i).toString(16);
  }
  return hexStr;
}

function bin2dec(plaintext) {
  var num = parseInt(plaintext, 2);
  if (!isNaN(num) && num < Number.MAX_SAFE_INTEGER) {
    return num;
  }
  return plaintext;
}

function bin2hex(plaintext) {
  while(plaintext.length % 4 != 0) {
    plaintext = "0" + plaintext;
  }
  var hexStr = "";
  for (i = 0; i < plaintext.length; i += 4) {
    hexStr += parseInt(plaintext.substr(i, 4), 2).toString(16);
  }
  return hexStr;
}

function bin2txt(plaintext) {
  return hex2txt(bin2hex(plaintext));
}

function dec2bin(plaintext) {
  if (!isNaN(plaintext) && parseInt(plaintext) < Number.MAX_SAFE_INTEGER) {
    return parseInt(plaintext).toString(2);
  }
  return plaintext;
}

function dec2hex(plaintext) {
  if (!isNaN(plaintext) && parseInt(plaintext) < Number.MAX_SAFE_INTEGER) {
    return parseInt(plaintext).toString(16);
  }
  return plaintext;
}

function hex2bin(plaintext) {
  var binStr = "";
  for (i = 0; i < plaintext.length; i ++) {
    var bin = parseInt(plaintext.substr(i, 1), 16).toString(2);
    while(bin.length < 4) {
      bin = "0" + bin;
    }
    binStr += bin
  }
  return binStr;
}

function hex2dec(plaintext) {
  var num = parseInt(plaintext, 16);
  if (!isNaN(num) && num < Number.MAX_SAFE_INTEGER) {
    return num;
  }
  return plaintext;
}

function hex2txt(plaintext) {
  var asciiStr = "";
  for (i = 0; i < plaintext.length; i += 2) {
    asciiStr += String.fromCharCode(parseInt(plaintext.substr(i, 2), 16));
  }
  return asciiStr;
}
