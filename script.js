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
    this.language = '',
    this.cursorPos = 0,
    this.capsLock = false
  }
}

const keySet = {
  'en': 
  [{x:['`', '~']}, {x:['1', '!']}, {x:['2', '@']}, {x:['3', '#']}, {x:['4', '$']}, {x:['5', '%']}, {x:['6', '^']}, 
  {x:['7', '&']}, {x:['8', '*']}, {x:['9', '\(']}, {x:['0', ')']}, {x:['-', '_']}, {x:['=', '+']}, "Backspace",
  "CapsLock", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", {x:['[', '{']}, {x:[']', '}']}, "Del",
  "a", "s", "d", "f", "g", "h", "j", "k", "l", {x:[';', ':']}, {x:['\'', '"']}, {x:['\\', '|']}, "Enter",
  "ShiftLeft", "z", "x", "c", "v", "b", "n", "m", {x:[',', '<']}, {x:['.', '>']}, {x:['/', '?']}, "ShiftRight",
  "Control", "Alt", "Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"], 
  'ru': 
  ["ё", {x:['1', '!']}, {x:['2', '"']}, {x:['3', '№']}, {x:['4', ';']}, {x:['5', '%']}, {x:['6', ':']}, 
  {x:['7', '?']}, {x:['8', '*']}, {x:['9', '\(']}, {x:['0', ')']}, {x:['-', '_']}, {x:['=', '+']}, "Backspace", 
  "CapsLock", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Del", 
  "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", {x:['\\', '/']}, "Enter", 
  "ShiftLeft", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", {x:['.', ',']}, "ShiftRight", 
  "Control", "Alt", "Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"]
};

const keyBoard = new Keyboard();
let langSign;

function keyboardInit() {

  keyBoard.textarea = document.createElement('textarea');
  keyBoard.textarea.classList.add('text-input');
  document.body.appendChild(keyBoard.textarea);
  keyBoard.textarea.value = '';
  keyBoard.textarea.focus();

  keyBoard.infoBox = document.createElement('div');
  keyBoard.infoBox.classList.add('info-box');
  document.body.appendChild(keyBoard.infoBox);
  const winLogo = document.createElement('img');
  winLogo.src = './assets/winlogo.png';
  winLogo.alt = 'Windows logo';
  winLogo.classList.add('win-logo');
  keyBoard.infoBox.appendChild(winLogo);
  if (localStorage.getItem('language')) {
    keyBoard.language = localStorage.getItem('language');
  } else {
    keyBoard.language = 'en';
    localStorage.setItem('language', 'en');
  }
  langSign = document.createElement('div');
  langSign.classList.add('lang-sign');
  langSign.textContent = (`${keyBoard.language}`).toUpperCase();
  keyBoard.infoBox.appendChild(langSign);
  const shiftInfo = document.createElement('span');
  shiftInfo.classList.add('shift-info');
  shiftInfo.textContent = 'En/Ru switch: Ctrl-Shift';
  keyBoard.infoBox.appendChild(shiftInfo);

  keyBoard.keys_container = document.createElement('div');
  keyBoard.keys_container.classList.add('keys-container');
  document.body.appendChild(keyBoard.keys_container);
  keyBoard.keys_container.appendChild(createKeys());

  
}

function createKeys() {

  const fragment = document.createDocumentFragment();

  let currentLayout = keySet[`${keyBoard.language}`];
  currentLayout.forEach(keyName => {
    const keyElement = document.createElement('button');
    const key = new Key(keyName);
    keyElement.classList.add("keyboard-key");
    keyElement.isPressed = false;
    const insertLineBreak = [currentLayout[13], currentLayout[27], currentLayout[40], currentLayout[52]].indexOf(keyName) !== -1;

    if (typeof keyName !== 'object') {
    switch (keyName) {

      case "Control":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = '<span>Ctrl</span>';
        keyElement.classList.add('ctrl');
        keyElement.addEventListener('click', () => {
          keyElement.isPressed = true;
          keyElement.classList.add('keyboard-key-pressed');
        })
        break;

      case "Backspace":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = key.createIconHTML("backspace");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
        keyElement.addEventListener("click", () => {
          let s = keyBoard.textarea.selectionStart;
          let e = keyBoard.textarea.selectionEnd;
          if (s === 0 && e === 0) return;
          if (s === e) {
            keyBoard.textarea.value = keyBoard.textarea.value.slice(0, s - 1) + keyBoard.textarea.value.slice(e);
            keyBoard.textarea.focus();
            keyBoard.textarea.selectionStart = s - 1;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
          } else {
            keyBoard.textarea.value = keyBoard.textarea.value.slice(0, s) + keyBoard.textarea.value.slice(e);
            keyBoard.textarea.focus();
            keyBoard.textarea.selectionStart = s;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
          }
        });
        break;

      case "CapsLock":
        keyElement.classList.add("keyboard-key-wide", "keyboard-key-caps");
        keyElement.innerHTML = '<span>CapsLock</span>';
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
        if (keyBoard.capsLock) keyElement.classList.add("keyboard-key-caps-active");
        keyElement.addEventListener("click", () => {
          toggleCapsLock();
          keyElement.classList.toggle("keyboard-key-caps-active", keyBoard.capsLock);
          keyBoard.textarea.focus();
        });
        break;

      case "Del":
        keyElement.innerHTML = '<span>Del</span>';
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
        keyElement.addEventListener("click", () => {
          let s = keyBoard.textarea.selectionStart;
          let e = keyBoard.textarea.selectionEnd;
          // if (s === 0 && e === 0) return;
          if (s === e) {
            keyBoard.textarea.value = keyBoard.textarea.value.slice(0, s) + keyBoard.textarea.value.slice(e + 1);
            keyBoard.textarea.focus();
            keyBoard.textarea.selectionStart = s;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
          } else {
            keyBoard.textarea.value = keyBoard.textarea.value.slice(0, s) + keyBoard.textarea.value.slice(e);
            keyBoard.textarea.focus();
            keyBoard.textarea.selectionStart = s;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
          }
        });
        break;

      case "ShiftLeft":
      case "ShiftRight":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = '<span>Shift</span>';
        keyElement.classList.add('shift');
        keyElement.addEventListener("click", () => {
          if (document.querySelector('.ctrl').isPressed) {
            keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
            keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
            toggleEnRu();
          } else {
            keyElement.isPressed = true;
            keyElement.classList.add('keyboard-key-pressed');
          }       
        });
        break;
      
      case "Alt":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = '<span>Alt</span>';
        keyElement.setAttribute('id', 'alt');
        
        break;
      
      case "Enter":
        keyElement.classList.add("keyboard-key-wide");
        keyElement.innerHTML = key.createIconHTML("keyboard_return");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
        keyElement.addEventListener("click", () => {
          keyBoard.textarea.value += "\n";
          keyBoard.textarea.focus();
        });
        
        break;

      case "Space":
        keyElement.classList.add("keyboard-key-space");
        keyElement.innerHTML = key.createIconHTML("space_bar");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
        keyElement.addEventListener("click", () => {
          keyBoard.textarea.value += " ";
          keyBoard.textarea.focus();

        });
        break;

      case "ArrowLeft":
        keyElement.innerHTML = key.createIconHTML("arrow_back");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}

        break;

      case "ArrowRight":
        keyElement.innerHTML = key.createIconHTML("arrow_forward");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}

        break;

      case "ArrowUp":
        keyElement.innerHTML = key.createIconHTML("arrow_upward");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
  
        break;
      
      case "ArrowDown":
        keyElement.innerHTML = key.createIconHTML("arrow_downward");
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
  
        break;

      default:
        if (!keyBoard.capsLock) {          
          keyElement.innerText = key.name.toLowerCase();          
        } else {      
          keyElement.innerText = key.name.toUpperCase();
        }
        keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
        keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
        keyElement.addEventListener("click", () => {
          if (keyBoard.capsLock || document.querySelectorAll('.shift')[0].isPressed || document.querySelectorAll('.shift')[1].isPressed) {          
            keyBoard.textarea.value += key.name.toUpperCase();
          } else if (keyBoard.capsLock && (document.querySelectorAll('.shift')[0].isPressed || document.querySelectorAll('.shift')[1].isPressed)) {
            keyBoard.textarea.value += key.name.toLowerCase();
          } else {      
            keyBoard.textarea.value += key.name.toLowerCase();
          } 
          unpressShift();
          keyBoard.textarea.focus();
          
        });

        break;
      }
    } else {
      keyElement.innerText = key.name.x[0];
      let shiftSign = document.createElement('span');
      shiftSign.classList.add('keyboard-key-shift');
      shiftSign.textContent = key.name.x[1];
      keyElement.appendChild(shiftSign);
      keyElement.onmousedown = function() {keyElement.classList.add('keyboard-key-pressed')}
      keyElement.onmouseup = function() {keyElement.classList.remove('keyboard-key-pressed')}
      keyElement.addEventListener("click", () => {
        if (document.querySelectorAll('.shift')[0].isPressed || document.querySelectorAll('.shift')[1].isPressed) {
          keyBoard.textarea.value += key.name.x[1];
          unpressShift();
        } else {
          keyBoard.textarea.value += key.name.x[0];
        }
        keyBoard.textarea.focus();
      });
    }

    document.addEventListener('keydown', (event) => {
      if (keyElement.innerText === event.key || keyElement.innerText === event.key.toUpperCase()) {
        keyElement.classList.add('keyboard-key-highlighted');
      }
    });
    document.addEventListener('keyup', (event) => {
      if (keyElement.innerText === event.key || keyElement.innerText === event.key.toUpperCase()) {
        keyElement.classList.remove('keyboard-key-highlighted');
      }
    });

    fragment.appendChild(keyElement);

    if (insertLineBreak) {
      fragment.appendChild(document.createElement("br"));
    }
  });

  

  return fragment;
}

function toggleCapsLock() {
  keyBoard.capsLock = !keyBoard.capsLock;    
  keyBoard.keys_container.childNodes.forEach(el => {
    if (el.childElementCount === 0) {
      if (keyBoard.capsLock) {          
        el.innerText = el.innerText.toUpperCase();          
      } else {      
        el.innerText = el.innerText.toLowerCase();
      } 
    }
  });
}

function toggleEnRu() {
  if (keyBoard.language === 'en') {
    keyBoard.language = 'ru';
    localStorage.setItem('language', 'ru');
  } else {
    keyBoard.language = 'en';
    localStorage.setItem('language', 'en');
  }
  langSign.textContent = (`${keyBoard.language}`).toUpperCase();
  keyBoard.keys_container.remove();
  keyBoard.keys_container = document.createElement('div');
  keyBoard.keys_container.classList.add('keys-container');
  document.body.appendChild(keyBoard.keys_container);
  keyBoard.keys_container.appendChild(createKeys());
}

function unpressShift() {
  document.querySelectorAll('.shift').forEach(el => {
    el.isPressed = false;
    el.classList.remove('keyboard-key-pressed');
  });
}

keyboardInit();