'use strict';

// ══════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════

const COUNTRIES = new Set([
  "Россия","Германия","Франция","Италия","Испания","Великобритания",
  "Польша","Нидерланды","Швеция","Норвегия","Финляндия","Швейцария",
  "Австрия","Бельгия","Португалия","Греция","Румыния","Венгрия",
  "Чехия","Дания","Украина","Беларусь","Словакия","Болгария",
  "Сербия","Хорватия","Босния и Герцеговина","Словения","Литва",
  "Латвия","Эстония","Молдова","Албания","Северная Македония",
  "Черногория","Ирландия","Исландия","Люксембург","Мальта","Кипр",
  "Лихтенштейн","Монако","Андорра","Сан-Марино","Ватикан",
  "Китай","Япония","Индия","Южная Корея","Индонезия","Таиланд",
  "Вьетнам","Филиппины","Малайзия","Сингапур","Казахстан",
  "Саудовская Аравия","ОАЭ","Иран","Ирак","Пакистан","Бангладеш",
  "Израиль","Иордания","Сирия","Турция","Афганистан","Мьянма",
  "Камбоджа","Лаос","Монголия","Северная Корея","Непал","Шри-Ланка",
  "Мальдивы","Бутан","Узбекистан","Туркменистан","Таджикистан",
  "Кыргызстан","Азербайджан","Армения","Грузия","Ливан","Кувейт",
  "Катар","Бахрейн","Оман","Йемен","Бруней","Восточный Тимор",
  "Палестина",
  "Египет","ЮАР","Нигерия","Кения","Марокко","Эфиопия","Танзания",
  "Гана","Алжир","Тунис","Ливия","Судан","Южный Судан","Конго",
  "ДР Конго","Ангола","Мозамбик","Замбия","Зимбабве","Уганда",
  "Руанда","Бурунди","Камерун","Кот-д'Ивуар","Сенегал","Мали",
  "Буркина-Фасо","Нигер","Чад","Мавритания","Гвинея","Бенин",
  "Того","Сьерра-Леоне","Либерия","Гамбия","Гвинея-Бисау",
  "Кабо-Верде","Сомали","Джибути","Эритрея","Экваториальная Гвинея",
  "Габон","ЦАР","Намибия","Ботсвана","Лесото","Эсватини","Малави",
  "Мадагаскар","Маврикий","Сейшелы","Коморы","Сан-Томе и Принсипи",
  "США","Канада","Мексика","Куба","Гаити","Доминиканская Республика",
  "Ямайка","Тринидад и Тобаго","Панама","Коста-Рика","Никарагуа",
  "Гондурас","Сальвадор","Гватемала","Белиз","Багамы","Барбадос",
  "Сент-Люсия","Гренада","Антигуа и Барбуда","Доминика",
  "Сент-Китс и Невис","Сент-Винсент и Гренадины",
  "Бразилия","Аргентина","Колумбия","Перу","Чили","Венесуэла",
  "Боливия","Парагвай","Уругвай","Эквадор","Гайана","Суринам",
  "Австралия","Новая Зеландия","Папуа — Новая Гвинея","Фиджи",
  "Соломоновы Острова","Вануату","Самоа","Кирибати","Тонга",
  "Микронезия","Палау","Маршалловы Острова","Науру","Тувалу",
]);

const ALIASES = {
  "рф":"Россия","российская федерация":"Россия",
  "сша":"США","америка":"США","соединённые штаты":"США","соединенные штаты":"США","штаты":"США",
  "британия":"Великобритания","англия":"Великобритания","великая британия":"Великобритания","uk":"Великобритания",
  "оаэ":"ОАЭ","объединённые арабские эмираты":"ОАЭ","объединенные арабские эмираты":"ОАЭ","эмираты":"ОАЭ",
  "дрк":"ДР Конго","демократическая республика конго":"ДР Конго","конго-киншаса":"ДР Конго","заир":"ДР Конго",
  "юар":"ЮАР","южная африка":"ЮАР",
  "цар":"ЦАР","центральноафриканская республика":"ЦАР",
  "чешская республика":"Чехия","чехословакия":"Чехия",
  "кндр":"Северная Корея",
  "корея":"Южная Корея",
  "бирма":"Мьянма",
  "свазиленд":"Эсватини",
  "македония":"Северная Македония",
  "тимор-лесте":"Восточный Тимор",
  "папуа новая гвинея":"Папуа — Новая Гвинея","папуа-новая гвинея":"Папуа — Новая Гвинея",
  "кот д'ивуар":"Кот-д'Ивуар","кот дивуар":"Кот-д'Ивуар","берег слоновой кости":"Кот-д'Ивуар",
  "босния":"Босния и Герцеговина","герцеговина":"Босния и Герцеговина",
  "тринидад":"Тринидад и Тобаго",
  "антигуа":"Антигуа и Барбуда",
  "сент китс":"Сент-Китс и Невис","сент-китс":"Сент-Китс и Невис",
  "сент винсент":"Сент-Винсент и Гренадины","сент-винсент":"Сент-Винсент и Гренадины",
  "сан томе":"Сан-Томе и Принсипи","сан-томе":"Сан-Томе и Принсипи",
  "соломоновы острова":"Соломоновы Острова",
  "маршалловы острова":"Маршалловы Острова",
  "федеративные штаты микронезии":"Микронезия",
  "палестинская автономия":"Палестина",
  "голландия":"Нидерланды",
  "белоруссия":"Беларусь",
  "молдавия":"Молдова",
  "киргизия":"Кыргызстан","киргизстан":"Кыргызстан",
};

// Нормализация для голосового ввода: убираем шумы распознавания
const VOICE_NORMALIZE = {
  // Часто распознаётся неправильно
  "германии":"германия","россию":"россия","францию":"франция",
  "китае":"китай","японии":"япония","индии":"индия",
  "бразилии":"бразилия","аргентины":"аргентина","канады":"канада",
  "мексики":"мексика","италии":"италия","испании":"испания",
  "польши":"польша","швеции":"швеция","норвегии":"норвегия",
  "турции":"турция","египте":"египет","нигерии":"нигерия",
  "кении":"кения","марокко":"марокко","алжира":"алжир",
  "судане":"судан","анголы":"ангола","мозамбик":"мозамбик",
  "уганды":"уганда","ганы":"гана","мали":"мали",
  "чаде":"чад","нигере":"нигер","бенине":"бенин",
  "того":"того","либерии":"либерия","гамбии":"гамбия",
  "сомали":"сомали","джибути":"джибути",
  "намибии":"намибия","ботсваны":"ботсвана",
  "австралии":"австралия","фиджи":"фиджи","самоа":"самоа",
  "тонга":"тонга","палау":"палау","науру":"науру","тувалу":"тувалу",
};

const CANONICAL_LOWER = new Map();
for (const c of COUNTRIES) CANONICAL_LOWER.set(c.toLowerCase(), c);

function normalizeWord(w) {
  return VOICE_NORMALIZE[w] || w;
}

function matchCountry(raw) {
  const t = raw.trim();
  if (!t) return null;
  const lo = t.toLowerCase();
  if (CANONICAL_LOWER.has(lo)) return CANONICAL_LOWER.get(lo);
  if (ALIASES[lo]) {
    const a = ALIASES[lo];
    if (COUNTRIES.has(a)) return a;
    if (CANONICAL_LOWER.has(a.toLowerCase())) return CANONICAL_LOWER.get(a.toLowerCase());
  }
  return null;
}

// Жадный разбор транскрипта слева направо.
// Нормализует падежи, пробует окна 4→1 слово.
// Возвращает список найденных стран (с дедупликацией внутри фрагмента).
function extractCountries(text) {
  const raw  = text.trim().toLowerCase();
  // Токенизация: убираем знаки пунктуации, нормализуем пробелы
  const words = raw.replace(/[.,!?;:]/g, ' ').split(/\s+/).filter(Boolean);
  const found = [];
  const seenInThisChunk = new Set(); // не дублируем внутри одного финального результата
  let i = 0;
  while (i < words.length) {
    let matched = null;
    let matchLen = 0;
    const maxLen = Math.min(4, words.length - i);
    for (let len = maxLen; len >= 1; len--) {
      const slice = words.slice(i, i + len);
      // Пробуем как есть и с нормализацией каждого слова
      const phrase1 = slice.join(' ');
      const phrase2 = slice.map(normalizeWord).join(' ');
      for (const phrase of [phrase1, phrase2]) {
        const c = matchCountry(phrase);
        if (c && !seenInThisChunk.has(c)) {
          matched = c; matchLen = len;
          break;
        }
      }
      if (matched) break;
    }
    if (matched) {
      seenInThisChunk.add(matched);
      found.push(matched);
      i += matchLen;
    } else {
      i++;
    }
  }
  return found;
}

// ══════════════════════════════════════════════════════
//  CONSTANTS & STATE
// ══════════════════════════════════════════════════════

const TOTAL   = 195;
const CIRCUM  = 2 * Math.PI * 50;

let selectedDuration = 600;
let selectedMode     = 'text';

let answered      = new Set();
let timeLeft      = 0;
let timerID       = null;   // setInterval handle
let gameActive    = false;
let gameEnded     = false;  // one-shot flag, prevents any second call to endGame

// ── Voice ─────────────────────────────────────────────────────────
let rec          = null;   // SpeechRecognition instance
let recRunning   = false;  // true while rec is between .start() and .onend
let stopOnPurpose = false; // set before intentional .stop()

// ══════════════════════════════════════════════════════
//  DOM
// ══════════════════════════════════════════════════════

const $ = id => document.getElementById(id);

const screens        = { start: $('start-screen'), game: $('game-screen'), result: $('result-screen') };
const countCorrectEl = $('count-correct');
const pctValEl       = $('pct-val');
const timerTextEl    = $('timer-text');
const ringFillEl     = $('ring-fill');
const progressFillEl = $('progress-fill');
const inputEl        = $('country-input');
const submitBtn      = $('submit-btn');
const feedbackEl     = $('feedback-toast');
const answeredHeader = $('answered-header');
const answeredGrid   = $('answered-grid');
const textInputArea  = $('text-input-area');
const voiceInputArea = $('voice-input-area');
const voiceBtnEl     = $('voice-btn');
const voiceBtnLabel  = $('voice-btn-label');
const voiceListening = $('voice-listening');
const voiceInterim   = $('voice-interim');
const resCorrectEl   = $('res-correct');
const resPctEl       = $('res-pct');
const resultTitleEl  = $('result-title');
const resultSubEl    = $('result-subtitle');
const resultTrophyEl = $('result-trophy');
const resultTagsEl   = $('result-tags');
const shareUrlEl     = $('share-url');
const copyBtnEl      = $('copy-btn');
const btnStart       = $('btn-start');
const btnAgain       = $('btn-again');

// ══════════════════════════════════════════════════════
//  START SCREEN SELECTORS
// ══════════════════════════════════════════════════════

document.querySelectorAll('.time-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDuration = +btn.dataset.time;
  })
);

document.querySelectorAll('.mode-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedMode = btn.dataset.mode;
    const warn = $('voice-warning');
    if (selectedMode === 'voice') {
      warn.style.display = 'block';
      const ok = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);
      warn.textContent = ok
        ? '⚠️ Будет запрошен доступ к микрофону. Говори чётко — можно называть много стран подряд без пауз.'
        : '❌ Браузер не поддерживает Web Speech API. Используйте Chrome или Edge.';
      warn.style.color = ok ? '' : 'var(--wrong)';
    } else {
      warn.style.display = 'none';
    }
  })
);

// ══════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function formatTime(s) {
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}

function updateRing(s) {
  const f = s / selectedDuration;
  ringFillEl.style.strokeDashoffset = CIRCUM * (1 - f);
  ringFillEl.style.stroke = f > .5 ? 'url(#timerGradV2)' : f > .2 ? '#f5c842' : '#f4536a';
}

function updateStats() {
  const n = answered.size, pct = Math.round(n / TOTAL * 100);
  countCorrectEl.textContent = n;
  pctValEl.textContent = pct + '%';
  progressFillEl.style.width = pct + '%';
  answeredHeader.textContent = `Принятые страны (${n})`;
}

function addTag(name) {
  const t = document.createElement('span');
  t.className = 'answered-tag';
  t.textContent = name;
  answeredGrid.appendChild(t);
  answeredGrid.closest('.answered-section').scrollTop = 9e9;
}

// ── Feedback queue (не перебивает быстрые сообщения) ──────────────
let fbQueue = [], fbBusy = false, fbTimer = null;

function showFeedback(msg, type) {
  fbQueue.push({ msg, type });
  pumpFeedback();
}

function pumpFeedback() {
  if (fbBusy || !fbQueue.length) return;
  fbBusy = true;
  const { msg, type } = fbQueue.shift();
  feedbackEl.textContent = msg;
  feedbackEl.className = 'feedback-toast ' + type;
  clearTimeout(fbTimer);
  fbTimer = setTimeout(() => {
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback-toast';
    fbBusy = false;
    pumpFeedback();
  }, fbQueue.length ? 500 : 1400);
}

// ── Core guess ────────────────────────────────────────────────────
function submitGuess(name) {
  // called with canonical name already
  if (!gameActive || gameEnded) return;
  if (answered.has(name)) return; // silent skip for voice rapid-fire
  answered.add(name);
  addTag(name);
  updateStats();
  showFeedback('✓ ' + name, 'ok');
  if (answered.size >= TOTAL) triggerEnd(true);
}

// ══════════════════════════════════════════════════════
//  TEXT INPUT
// ══════════════════════════════════════════════════════

function handleTextSubmit() {
  if (!gameActive || gameEnded || !inputEl) return;
  const raw = inputEl.value.trim();
  if (!raw) return;
  inputEl.value = '';
  const c = matchCountry(raw);
  if (!c) {
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 320);
    showFeedback('❌ Неизвестная страна', 'err');
    return;
  }
  if (answered.has(c)) {
    showFeedback(`🔁 ${c} — уже есть!`, 'dup');
    return;
  }
  inputEl.classList.add('glow-correct');
  setTimeout(() => inputEl.classList.remove('glow-correct'), 400);
  submitGuess(c);
}

// ══════════════════════════════════════════════════════
//  VOICE
// ══════════════════════════════════════════════════════

function buildRec() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;

  const r = new SR();
  r.lang           = 'ru-RU';
  r.continuous     = true;
  r.interimResults = true;
  r.maxAlternatives = 6;

  // Курсор обработанных слов для КАЖДОГО resultIndex.
  // Ключ = resultIndex, значение = кол-во слов уже засчитанных из interim этого результата.
  // Это позволяет засчитывать страны СРАЗУ по мере появления в interim,
  // не дожидаясь финального результата — главное ускорение.
  const processedWords = new Map();

  r.onstart = () => {
    recRunning = true;
    voiceListening.classList.add('active');
    voiceBtnEl.classList.add('listening');
    voiceBtnLabel.textContent = 'Слушаю...';
    voiceInterim.textContent  = '...';
  };

  r.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const isFinal = result.isFinal;

      // Берём лучшую альтернативу — но также проверяем все остальные
      // Собираем уникальные транскрипты (alt0 … alt N)
      const alts = [];
      for (let j = 0; j < result.length; j++) {
        alts.push(result[j].transcript);
      }

      // Основной транскрипт для отображения
      const mainText = alts[0].trim();

      if (isFinal) {
        // Финальный результат: проходим по ВСЕМ альтернативам,
        // извлекаем страны из каждой, берём лучший (наибольший) набор
        let bestFound = [];
        for (const alt of alts) {
          const found = extractCountries(alt);
          if (found.length > bestFound.length) bestFound = found;
        }
        // Засчитываем все найденные
        for (const country of bestFound) submitGuess(country);

        // Обнуляем cursor для этого resultIndex
        processedWords.delete(i);
        voiceInterim.textContent = '...';

      } else {
        // INTERIM — работаем инкрементально.
        // Разбиваем на слова, смотрим сколько уже обработали
        const words = mainText.toLowerCase()
          .replace(/[.,!?;:]/g, ' ')
          .split(/\s+/).filter(Boolean);

        const cursor = processedWords.get(i) || 0;

        // Пробуем найти страны в ещё необработанном хвосте
        // Но оставляем последние 1 слово как «неполное» — оно ещё может дополниться
        const safeEnd = Math.max(cursor, words.length - 1);
        if (safeEnd <= cursor) {
          // Нечего обрабатывать ещё
          voiceInterim.textContent = mainText || '...';
          continue;
        }

        const tail = words.slice(cursor, safeEnd);
        let pos = 0;
        let newCursor = cursor;
        while (pos < tail.length) {
          let matched = null, matchLen = 0;
          for (let len = Math.min(4, tail.length - pos); len >= 1; len--) {
            const slice = tail.slice(pos, pos + len);
            const p1 = slice.join(' ');
            const p2 = slice.map(normalizeWord).join(' ');
            for (const p of [p1, p2]) {
              const c = matchCountry(p);
              if (c) { matched = c; matchLen = len; break; }
            }
            if (matched) break;
          }
          if (matched) {
            submitGuess(matched);
            pos += matchLen;
            newCursor = cursor + pos;
          } else {
            pos++;
            newCursor = cursor + pos;
          }
        }
        processedWords.set(i, newCursor);

        // Показываем в строке статус
        const tentative = extractCountries(mainText);
        voiceInterim.textContent = tentative.length
          ? '🔍 ' + tentative.slice(-3).join(', ') + (tentative.length > 3 ? '...' : '')
          : mainText || '...';
      }
    }
  };

  r.onerror = (e) => {
    if (e.error === 'no-speech' || e.error === 'aborted') return;
    if (e.error === 'not-allowed') {
      showFeedback('❌ Доступ к микрофону запрещён', 'err');
      triggerEnd();
    }
  };

  r.onend = () => {
    recRunning = false;
    voiceListening.classList.remove('active');
    voiceBtnEl.classList.remove('listening');
    voiceBtnLabel.textContent = 'Нажми и говори';

    if (stopOnPurpose || !gameActive || gameEnded) return;

    // Перезапуск через минимальную задержку для непрерывного слушания
    setTimeout(() => {
      if (!stopOnPurpose && gameActive && !gameEnded && rec) {
        try { rec.start(); } catch(_) {}
      }
    }, 80);
  };

  return r;
}

function startVoice() {
  stopOnPurpose = false;
  rec = buildRec();
  if (!rec) { showFeedback('❌ Браузер не поддерживает голосовой ввод', 'err'); return; }
  try { rec.start(); } catch(e) { console.warn('rec.start:', e); }
}

function stopVoice() {
  stopOnPurpose = true;
  if (rec) {
    try { rec.stop(); } catch(_) {}
    // Не обнуляем rec сразу — onend проверит stopOnPurpose
  }
  voiceListening.classList.remove('active');
  voiceBtnEl && voiceBtnEl.classList.remove('listening');
}

// ══════════════════════════════════════════════════════
//  TIMER
// ══════════════════════════════════════════════════════

function startTimer() {
  timeLeft = selectedDuration;
  timerTextEl.textContent = formatTime(timeLeft);
  updateRing(timeLeft);
  if (timerID) { clearInterval(timerID); timerID = null; }
  timerID = setInterval(() => {
    if (!gameActive || gameEnded) { clearInterval(timerID); timerID = null; return; }
    timeLeft--;
    timerTextEl.textContent = formatTime(timeLeft);
    updateRing(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerID); timerID = null;
      triggerEnd();
    }
  }, 1000);
}

// ══════════════════════════════════════════════════════
//  GAME FLOW
// ══════════════════════════════════════════════════════

function startGame() {
  // Reset everything
  answered.clear();
  answeredGrid.innerHTML = '';
  feedbackEl.textContent = '';
  feedbackEl.className   = 'feedback-toast';
  fbQueue = []; fbBusy = false;
  gameActive  = true;
  gameEnded   = false;
  stopOnPurpose = false;

  updateStats();
  showScreen('game');

  if (selectedMode === 'voice') {
    textInputArea.style.display = 'none';
    voiceInputArea.style.display = 'flex';
    voiceBtnEl.classList.remove('listening');
    voiceBtnLabel.textContent = 'Нажми и говори';
    voiceListening.classList.remove('active');
    startVoice();
  } else {
    textInputArea.style.display = 'flex';
    voiceInputArea.style.display = 'none';
    if (inputEl) { inputEl.value = ''; setTimeout(() => inputEl.focus(), 80); }
  }

  startTimer();
}

function triggerEnd(allDone = false) {
  // One-shot guard — no matter what calls this, it runs exactly once
  if (gameEnded) return;
  gameEnded  = true;
  gameActive = false;

  // Stop timer
  if (timerID) { clearInterval(timerID); timerID = null; }

  // Stop voice (don't wait for onend)
  stopVoice();

  // Give browser one frame to settle before switching screen
  // This prevents the "freeze on last second" visual glitch
  requestAnimationFrame(() => {
    showScreen('result');
    fillResultScreen(allDone);
  });
}

function fillResultScreen(allDone) {
  const n   = answered.size;
  const pct = Math.round(n / TOTAL * 100);

  resCorrectEl.textContent = n;
  resPctEl.textContent     = pct + '%';

  let trophy, title, subtitle;
  if      (allDone)   { trophy='🌍'; title='Все страны!';           subtitle='Невероятный результат! Ты знаешь все 195 стран!'; }
  else if (pct >= 70) { trophy='🏆'; title='Легенда географии!';   subtitle=`${n} стран — потрясающий результат!`; }
  else if (pct >= 50) { trophy='🥇'; title='Отличный результат!';  subtitle=`${n} из 195 — больше половины!`; }
  else if (pct >= 30) { trophy='🥈'; title='Хороший результат!';   subtitle=`${n} стран — неплохо, есть куда расти!`; }
  else if (pct >= 15) { trophy='🌐'; title='Неплохое начало!';     subtitle=`${n} стран — попробуй ещё!`; }
  else                { trophy='🗺️'; title='Время вышло!';         subtitle=`${n} стран — в следующий раз лучше!`; }

  resultTrophyEl.textContent = trophy;
  resultTitleEl.textContent  = title;
  resultSubEl.textContent    = subtitle;

  resultTagsEl.innerHTML = '';
  [...answered].sort((a,b) => a.localeCompare(b,'ru')).forEach(c => {
    const t = document.createElement('span');
    t.className = 'result-tag'; t.textContent = c;
    resultTagsEl.appendChild(t);
  });

  const now = new Date().toISOString().slice(0,16).replace('T','+');
  shareUrlEl.value = location.href.replace(/\/[^/]*$/,'/') +
    `result-v2.html#n=${n}&pct=${pct}&d=${encodeURIComponent(now)}`;
}

// ══════════════════════════════════════════════════════
//  EVENTS
// ══════════════════════════════════════════════════════

btnStart?.addEventListener('click', startGame);
btnAgain?.addEventListener('click', startGame);
submitBtn?.addEventListener('click', handleTextSubmit);
inputEl?.addEventListener('keydown', e => { if (e.key === 'Enter') handleTextSubmit(); });

voiceBtnEl?.addEventListener('click', () => {
  if (!gameActive || gameEnded) return;
  if (recRunning) { stopVoice(); }
  else            { stopOnPurpose = false; if (rec) { try { rec.start(); } catch(_){} } else { startVoice(); } }
});

copyBtnEl?.addEventListener('click', () => {
  const v = shareUrlEl.value; if (!v) return;
  navigator.clipboard.writeText(v).catch(() => { shareUrlEl.select(); document.execCommand('copy'); });
  copyBtnEl.classList.add('copied');
  setTimeout(() => copyBtnEl.classList.remove('copied'), 1500);
});
