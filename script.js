class Keyboard {
  constructor() {
    this.textarea = null,
    this.keys_container = null,
    this.infoBox = null;
    this.language = 'EN',
    this.typedText = '',
    this.cursorPos = 0,
    this.capsLock = false
  }
}

class Button {
  constructor(name) {
    this.name = name,
    this.text = null,
    this.icon = null
  }
}

const keySet = {
  'en':[
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
  "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
  "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift",
  "ctrl", "alt", "left", "space", "left", "up", "right", "down"], 
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "\(", ")", "_", "+", "backspace",
  "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
  "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "|", "enter",
  "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "shift",
  "ctrl", "alt", "left", "space", "left", "up", "right", "down"]
  ], 
  'ru': [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", 
  "caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 
  "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter", 
  "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shift", 
  "ctrl", "alt", "left", "space", "left", "up", "right", "down"], 
  ["ё", "!", "\"", "№", ";", "%", ":", "?", "*", "\(", ")", "_", "+", "backspace", 
  "caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 
  "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "/", "enter", 
  "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "shift", 
  "ctrl", "alt", "left", "space", "left", "up", "right", "down"]
  ]
};


function keyboardInit() {
  const keyBoard = new Keyboard();

  this.textarea = document.createElement('textarea');
  this.textarea.classList.add('text-input');
  document.body.appendChild(this.textarea);

  this.infoBox = document.createElement('div');
  this.infoBox.classList.add('info-box');
  document.body.appendChild(this.infoBox);
  const winLogo = document.createElement('img');
  winLogo.src = './assets/winlogo.png';
  winLogo.alt = 'Windows logo';
  winLogo.classList.add('win-logo');
  this.infoBox.appendChild(winLogo);
  const langSign = document.createElement('div');
  langSign.classList.add('lang-sign');
  langSign.textContent = `${keyBoard.language}`;
  this.infoBox.appendChild(langSign);
  const shiftInfo = document.createElement('span');
  shiftInfo.classList.add('shift-info');
  shiftInfo.textContent = 'Language shift: Ctrl-Shift';
  this.infoBox.appendChild(shiftInfo);

  this.keys_container = document.createElement('div');
  this.keys_container.classList.add('keys-container');
  document.body.appendChild(this.keys_container);
}

keyboardInit();