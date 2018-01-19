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

function disemowel(plaintext) {
  return plaintext.replace(/[AEIOUaeiou]/g, '');
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

function bin2oct(plaintext) {
  return dec2oct(bin2dec(plaintext));
}

function dec2bin(plaintext) {
  plaintext = plaintext.replace(/[,]/g, '');
  if (!isNaN(plaintext) && parseInt(plaintext) < Number.MAX_SAFE_INTEGER) {
    return parseInt(plaintext).toString(2);
  }
  return plaintext;
}

function dec2hex(plaintext) {
  plaintext = plaintext.replace(/[,]/g, '');
  if (!isNaN(plaintext) && parseInt(plaintext) < Number.MAX_SAFE_INTEGER) {
    return parseInt(plaintext).toString(16);
  }
  return plaintext;
}

function dec2oct(plaintext) {
  plaintext = plaintext.replace(/[,]/g, '');
  if (!isNaN(plaintext) && parseInt(plaintext) < Number.MAX_SAFE_INTEGER) {
    return parseInt(plaintext).toString(8);
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

function hex2oct(plaintext) {
  return dec2oct(hex2dec(plaintext));
}

function hex2txt(plaintext) {
  var asciiStr = "";
  for (i = 0; i < plaintext.length; i += 2) {
    asciiStr += String.fromCharCode(parseInt(plaintext.substr(i, 2), 16));
  }
  return asciiStr;
}

function oct2bin(plaintext) {
  return dec2bin(oct2dec(plaintext));
}

function oct2dec(plaintext) {
  var num = parseInt(plaintext, 8);
  if (!isNaN(num) && num < Number.MAX_SAFE_INTEGER) {
    return num;
  }
  return plaintext;
}

function oct2hex(plaintext) {
  return dec2hex(oct2dec(plaintext));
}
