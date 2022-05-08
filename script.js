class Key {
  constructor(name) {
    document.createElement('button'),
    this.name = name,
    this.icon = null
  }
  createIconHTML(icon_name) {
    this.icon = `<span class="material-icons">${icon_name}</span>`;
    return this.icon;
  }
}

class Keyboard {
  constructor() {
    this.textarea = null,
    this.keys_container = null,
    this.infoBox = null;
    this.language = 'en',
    this.typedText = '',
    this.cursorPos = 0,
    this.capsLock = false
  }
}

const keySet = {
  'en': [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "del",
  "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
  "leftShift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "rightShift",
  "ctrl", "alt", "space", "left", "up", "right", "down"], 
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "\(", ")", "_", "+", "backspace",
  "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
  "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "|", "enter",
  "leftShift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "rightShift",
  "ctrl", "alt", "space", "left", "up", "right", "down"]
  ], 
  'ru': [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", 
  "caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 
  "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter", 
  "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shift", 
  "ctrl", "alt", "space", "left", "up", "right", "down"], 
  ["ё", "!", "\"", "№", ";", "%", ":", "?", "*", "\(", ")", "_", "+", "backspace", 
  "caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 
  "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "/", "enter", 
  "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "shift", 
  "ctrl", "alt", "space", "left", "up", "right", "down"]
  ]
};

const keyBoard = new Keyboard();

function keyboardInit() {

  this.textarea = document.createElement('textarea');
  this.textarea.classList.add('text-input');
  document.body.appendChild(this.textarea);
  this.textarea.focus();

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
  langSign.textContent = (`${keyBoard.language}`).toUpperCase();
  this.infoBox.appendChild(langSign);
  const shiftInfo = document.createElement('span');
  shiftInfo.classList.add('shift-info');
  shiftInfo.textContent = 'Language shift: Ctrl-Shift';
  this.infoBox.appendChild(shiftInfo);

  this.keys_container = document.createElement('div');
  this.keys_container.classList.add('keys-container');
  document.body.appendChild(this.keys_container);

  this.keys_container.appendChild(createKeys());
}

function createKeys() {

  // const createIconHTML = (icon_name) => {
  //   return `<i class="material-icons">${icon_name}</i>`;
  // }

  const fragment = document.createDocumentFragment();

  let currentLayout = keySet.en[0];
  currentLayout.forEach(keyName => {
    const keyElement = document.createElement('button');
    const key = new Key(keyName);
    keyElement.classList.add("keyboard-key");
    const insertLineBreak = [currentLayout[13], currentLayout[27], currentLayout[40], currentLayout[52]].indexOf(keyName) !== -1;

    switch (keyName) {
      case "backspace":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = key.createIconHTML("backspace");

        // key.addEventListener("click", () => {
        //   this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
        //   this._triggerEvent("oninput");
        // });

        break;

      case "caps":
        keyElement.classList.add("keyboard-key-wide", "keyboard-key-caps");
        keyElement.innerText = 'CapsLock';
        if (keyBoard.capsLock) keyElement.classList.add("keyboard-key-caps-active");
        // keyElement.addEventListener("click", () => {
        //   this._toggleCapsLock();
        //   keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
        // });

        break;

      case "del":
        keyElement.innerText = 'Del';

        break;

      // case "en-ru":
      //   keyElement.classList.add("keyboard__key--wide");
      //   keyElement.textContent = this.properties.language ? "RU" : "EN";
      //   keyElement.addEventListener("click", () => {
      //     this._toggleEnRu();              
                        
      //   });

      //   break;

      case "leftShift":
      case "rightShift":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerText = 'Shift';
        // keyElement.addEventListener("click", () => {
        //   this._toggleShift();              
        // });
        
        break;

      case "ctrl":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerText = 'Ctrl';
          
        break;
      
      case "alt":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerText = 'Alt';
            
        break;
      
      case "enter":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = key.createIconHTML("keyboard_return");

        // keyElement.addEventListener("click", () => {
        //   this.properties.value += "\n";
        //   this._triggerEvent("oninput");
        // });

        break;

      case "space":
        keyElement.classList.add("keyboard-key-space");
        keyElement.innerHTML = key.createIconHTML("space_bar");

        // keyElement.addEventListener("click", () => {
        //   this.properties.value += " ";
        //   this._triggerEvent("oninput");
        // });

        break;

      case "left":
        keyElement.innerHTML = key.createIconHTML("arrow_back");

        break;

      case "right":
        keyElement.innerHTML = key.createIconHTML("arrow_forward");

        break;

      case "up":
        keyElement.innerHTML = key.createIconHTML("arrow_upward");
  
        break;
      
      case "down":
        keyElement.innerHTML = key.createIconHTML("arrow_downward");
  
        break;

        // case "done":
      //   keyElement.classList.add("keyboard__key--wide");
      //   keyElement.innerHTML = createIconHTML("keyboard_hide");

      //   keyElement.addEventListener("click", () => {
      //     this.close();
      //     this._triggerEvent("onclose");
      //   });

      //   break;

      default:
        keyElement.innerText = key.name;
        // if (keyBoard.capsLock === this.properties.shift) {          
        //   keyElement.textContent = key.toLowerCase();          
        // } else {      
        //   keyElement.textContent = key.toUpperCase();
        // }
       
        // keyElement.addEventListener("click", () => {
        //   if (this.properties.capsLock === this.properties.shift) {          
        //     this.properties.value += key.toLowerCase();          
        //   } else {      
        //     this.properties.value += key.toUpperCase();
        //   } 
          
        //   this._triggerEvent("oninput");
        // });

        break;
    }

    

    fragment.appendChild(keyElement);

    if (insertLineBreak) {
      fragment.appendChild(document.createElement("br"));
    }
  });



  return fragment;
}

keyboardInit();