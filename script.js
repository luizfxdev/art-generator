// ============================================
// DOM ELEMENTS
// ============================================
const textInput = document.getElementById('text-input');
const styleSelect = document.getElementById('style-select');
const convertBtn = document.getElementById('convert-btn');
const resetBtn = document.getElementById('reset-btn');
const resultDisplay = document.getElementById('result-display');
const copyBtn = document.getElementById('copy-btn');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');
const backgroundAudio = document.getElementById('background-audio');

// ============================================
// AUDIO CONTROLS
// ============================================
playAudioBtn.addEventListener('click', () => {
  backgroundAudio.play();
  playAudioBtn.style.opacity = '0.6';
  pauseAudioBtn.style.opacity = '1';
});

pauseAudioBtn.addEventListener('click', () => {
  backgroundAudio.pause();
  pauseAudioBtn.style.opacity = '0.6';
  playAudioBtn.style.opacity = '1';
});

// ============================================
// TEXT ART GENERATION FUNCTIONS
// ============================================

// Style 1: Heart Frame
function heartFrame(text) {
  return `/) /) ~  ┏━━━━━━━━┓
( •-• ) ~ ♡ ${text} ♡
/づづ ~  ┗━━━━━━━━┛`;
}

// Style 2: Floral Ornaments
function floralOrnament(text) {
  return `✿.｡.:* ☆:**:. ${text} .:**:.☆*.:｡.✿`;
}

// Style 3: ASCII Box
function asciiBox(text) {
  const width = text.length + 4;
  const topBottom = '─'.repeat(width);
  return `┌${topBottom}┐
│  ${text}  │
└${topBottom}┘`;
}

// Style 4: Bright Stars
function brightStars(text) {
  return `✧･ﾟ: *✧･ﾟ:* ${text} *:･ﾟ✧*:･ﾟ✧`;
}

// Style 5: Decorative Arrows
function decorativeArrows(text) {
  return `➤➤➤ ${text} ➤➤➤`;
}

// Style 6: Elegant Diamonds
function elegantDiamonds(text) {
  return `◈━━━━━━━◈
   ♦ ${text} ♦
◈━━━━━━━◈`;
}

// Style 7: Zig-Zag
function zigZag(text) {
  return `〰️〰️〰️ ${text} 〰️〰️〰️`;
}

// Style 8: Flags
function flags(text) {
  return `🚩🚩🚩 ${text} 🚩🚩🚩`;
}

// Style 9: Cute Emojis
function cuteEmojis(text) {
  return `(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ
   ${text}
   ◕⩊◕`;
}

// Style 10: Stylized Phrases
function stylizedPhrase(text) {
  return `☆꧁✬◦°˚°◦. ${text} .◦°˚°◦✬꧂☆`;
}

// ============================================
// MAIN CONVERSION FUNCTION
// ============================================
function convertTextToArt(text, styleId) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return '⚠️ Por favor, digite um texto antes de converter.';
  }

  switch (styleId) {
    case '1':
      return heartFrame(trimmedText);
    case '2':
      return floralOrnament(trimmedText);
    case '3':
      return asciiBox(trimmedText);
    case '4':
      return brightStars(trimmedText);
    case '5':
      return decorativeArrows(trimmedText);
    case '6':
      return elegantDiamonds(trimmedText);
    case '7':
      return zigZag(trimmedText);
    case '8':
      return flags(trimmedText);
    case '9':
      return cuteEmojis(trimmedText);
    case '10':
      return stylizedPhrase(trimmedText);
    default:
      return '⚠️ Por favor, selecione um estilo de arte.';
  }
}

// ============================================
// DISPLAY RESULT FUNCTION
// ============================================
function displayResult(artText) {
  resultDisplay.textContent = artText;
  resultDisplay.classList.add('has-content');

  // Show copy button if result is valid
  if (!artText.startsWith('⚠️')) {
    copyBtn.style.display = 'block';
    copyBtn.textContent = '📋 Copiar Arte';
    copyBtn.classList.remove('copied');
  } else {
    copyBtn.style.display = 'none';
  }

  // Scroll to result
  resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// CONVERT BUTTON EVENT
// ============================================
convertBtn.addEventListener('click', () => {
  const inputText = textInput.value;
  const selectedStyle = styleSelect.value;

  const artResult = convertTextToArt(inputText, selectedStyle);
  displayResult(artResult);
});

// ============================================
// RESET BUTTON EVENT
// ============================================
resetBtn.addEventListener('click', () => {
  textInput.value = '';
  styleSelect.value = '0';
  resultDisplay.textContent = '';
  resultDisplay.innerHTML = '<p class="result-placeholder">Sua arte aparecerá aqui...</p>';
  resultDisplay.classList.remove('has-content');
  copyBtn.style.display = 'none';
  textInput.focus();
});

// ============================================
// COPY TO CLIPBOARD FUNCTION
// ============================================
copyBtn.addEventListener('click', async () => {
  const textToCopy = resultDisplay.textContent;

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyBtn.textContent = '✅ Copiado!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = '📋 Copiar Arte';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      copyBtn.textContent = '✅ Copiado!';
      copyBtn.classList.add('copied');

      setTimeout(() => {
        copyBtn.textContent = '📋 Copiar Arte';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      alert('Erro ao copiar. Por favor, selecione e copie manualmente.');
    }

    document.body.removeChild(textArea);
  }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
textInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    convertBtn.click();
  }
});

document.addEventListener('keydown', e => {
  // Ctrl/Cmd + Enter to convert
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    convertBtn.click();
  }

  // Escape to reset
  if (e.key === 'Escape') {
    resetBtn.click();
  }
});

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  textInput.focus();
  pauseAudioBtn.style.opacity = '0.6';
});
