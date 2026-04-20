'use strict';

// ── SVG gradient injection ─────────────────────────────────────────
(function() {
  const svg = document.querySelector('.timer-ring svg');
  if (!svg) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#4f8cff"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>`;
  svg.prepend(defs);
})();

// ── Countries dataset ─────────────────────────────────────────────
const COUNTRIES = [
  // Европа
  {"name":"Россия","flag":"🇷🇺"},{"name":"Германия","flag":"🇩🇪"},
  {"name":"Франция","flag":"🇫🇷"},{"name":"Италия","flag":"🇮🇹"},
  {"name":"Испания","flag":"🇪🇸"},{"name":"Великобритания","flag":"🇬🇧"},
  {"name":"Польша","flag":"🇵🇱"},{"name":"Нидерланды","flag":"🇳🇱"},
  {"name":"Швеция","flag":"🇸🇪"},{"name":"Норвегия","flag":"🇳🇴"},
  {"name":"Финляндия","flag":"🇫🇮"},{"name":"Швейцария","flag":"🇨🇭"},
  {"name":"Австрия","flag":"🇦🇹"},{"name":"Бельгия","flag":"🇧🇪"},
  {"name":"Португалия","flag":"🇵🇹"},{"name":"Греция","flag":"🇬🇷"},
  {"name":"Румыния","flag":"🇷🇴"},{"name":"Венгрия","flag":"🇭🇺"},
  {"name":"Чехия","flag":"🇨🇿"},{"name":"Дания","flag":"🇩🇰"},
  {"name":"Украина","flag":"🇺🇦"},{"name":"Беларусь","flag":"🇧🇾"},
  {"name":"Словакия","flag":"🇸🇰"},{"name":"Болгария","flag":"🇧🇬"},
  {"name":"Сербия","flag":"🇷🇸"},{"name":"Хорватия","flag":"🇭🇷"},
  {"name":"Босния и Герцеговина","flag":"🇧🇦"},{"name":"Словения","flag":"🇸🇮"},
  {"name":"Литва","flag":"🇱🇹"},{"name":"Латвия","flag":"🇱🇻"},
  {"name":"Эстония","flag":"🇪🇪"},{"name":"Молдова","flag":"🇲🇩"},
  {"name":"Албания","flag":"🇦🇱"},{"name":"Северная Македония","flag":"🇲🇰"},
  {"name":"Черногория","flag":"🇲🇪"},{"name":"Ирландия","flag":"🇮🇪"},
  {"name":"Исландия","flag":"🇮🇸"},{"name":"Люксембург","flag":"🇱🇺"},
  {"name":"Мальта","flag":"🇲🇹"},{"name":"Кипр","flag":"🇨🇾"},
  {"name":"Лихтенштейн","flag":"🇱🇮"},{"name":"Монако","flag":"🇲🇨"},
  {"name":"Андорра","flag":"🇦🇩"},{"name":"Сан-Марино","flag":"🇸🇲"},
  {"name":"Ватикан","flag":"🇻🇦"},
  // Азия
  {"name":"Китай","flag":"🇨🇳"},{"name":"Япония","flag":"🇯🇵"},
  {"name":"Индия","flag":"🇮🇳"},{"name":"Южная Корея","flag":"🇰🇷"},
  {"name":"Индонезия","flag":"🇮🇩"},{"name":"Таиланд","flag":"🇹🇭"},
  {"name":"Вьетнам","flag":"🇻🇳"},{"name":"Филиппины","flag":"🇵🇭"},
  {"name":"Малайзия","flag":"🇲🇾"},{"name":"Сингапур","flag":"🇸🇬"},
  {"name":"Казахстан","flag":"🇰🇿"},{"name":"Саудовская Аравия","flag":"🇸🇦"},
  {"name":"ОАЭ","flag":"🇦🇪"},{"name":"Иран","flag":"🇮🇷"},
  {"name":"Ирак","flag":"🇮🇶"},{"name":"Пакистан","flag":"🇵🇰"},
  {"name":"Бангладеш","flag":"🇧🇩"},{"name":"Израиль","flag":"🇮🇱"},
  {"name":"Иордания","flag":"🇯🇴"},{"name":"Сирия","flag":"🇸🇾"},
  {"name":"Турция","flag":"🇹🇷"},{"name":"Афганистан","flag":"🇦🇫"},
  {"name":"Мьянма","flag":"🇲🇲"},{"name":"Камбоджа","flag":"🇰🇭"},
  {"name":"Лаос","flag":"🇱🇦"},{"name":"Монголия","flag":"🇲🇳"},
  {"name":"Северная Корея","flag":"🇰🇵"},{"name":"Непал","flag":"🇳🇵"},
  {"name":"Шри-Ланка","flag":"🇱🇰"},{"name":"Мальдивы","flag":"🇲🇻"},
  {"name":"Бутан","flag":"🇧🇹"},{"name":"Узбекистан","flag":"🇺🇿"},
  {"name":"Туркменистан","flag":"🇹🇲"},{"name":"Таджикистан","flag":"🇹🇯"},
  {"name":"Кыргызстан","flag":"🇰🇬"},{"name":"Азербайджан","flag":"🇦🇿"},
  {"name":"Армения","flag":"🇦🇲"},{"name":"Грузия","flag":"🇬🇪"},
  {"name":"Ливан","flag":"🇱🇧"},{"name":"Кувейт","flag":"🇰🇼"},
  {"name":"Катар","flag":"🇶🇦"},{"name":"Бахрейн","flag":"🇧🇭"},
  {"name":"Оман","flag":"🇴🇲"},{"name":"Йемен","flag":"🇾🇪"},
  {"name":"Бруней","flag":"🇧🇳"},{"name":"Восточный Тимор","flag":"🇹🇱"},
  {"name":"Палестина","flag":"🇵🇸"},
  // Африка
  {"name":"Египет","flag":"🇪🇬"},{"name":"ЮАР","flag":"🇿🇦"},
  {"name":"Нигерия","flag":"🇳🇬"},{"name":"Кения","flag":"🇰🇪"},
  {"name":"Марокко","flag":"🇲🇦"},{"name":"Эфиопия","flag":"🇪🇹"},
  {"name":"Танзания","flag":"🇹🇿"},{"name":"Гана","flag":"🇬🇭"},
  {"name":"Алжир","flag":"🇩🇿"},{"name":"Тунис","flag":"🇹🇳"},
  {"name":"Ливия","flag":"🇱🇾"},{"name":"Судан","flag":"🇸🇩"},
  {"name":"Южный Судан","flag":"🇸🇸"},{"name":"Конго","flag":"🇨🇬"},
  {"name":"ДР Конго","flag":"🇨🇩"},{"name":"Ангола","flag":"🇦🇴"},
  {"name":"Мозамбик","flag":"🇲🇿"},{"name":"Замбия","flag":"🇿🇲"},
  {"name":"Зимбабве","flag":"🇿🇼"},{"name":"Уганда","flag":"🇺🇬"},
  {"name":"Руанда","flag":"🇷🇼"},{"name":"Бурунди","flag":"🇧🇮"},
  {"name":"Камерун","flag":"🇨🇲"},{"name":"Кот-д'Ивуар","flag":"🇨🇮"},
  {"name":"Сенегал","flag":"🇸🇳"},{"name":"Мали","flag":"🇲🇱"},
  {"name":"Буркина-Фасо","flag":"🇧🇫"},{"name":"Нигер","flag":"🇳🇪"},
  {"name":"Чад","flag":"🇹🇩"},{"name":"Мавритания","flag":"🇲🇷"},
  {"name":"Гвинея","flag":"🇬🇳"},{"name":"Бенин","flag":"🇧🇯"},
  {"name":"Того","flag":"🇹🇬"},{"name":"Сьерра-Леоне","flag":"🇸🇱"},
  {"name":"Либерия","flag":"🇱🇷"},{"name":"Гамбия","flag":"🇬🇲"},
  {"name":"Гвинея-Бисау","flag":"🇬🇼"},{"name":"Кабо-Верде","flag":"🇨🇻"},
  {"name":"Сомали","flag":"🇸🇴"},{"name":"Джибути","flag":"🇩🇯"},
  {"name":"Эритрея","flag":"🇪🇷"},{"name":"Экваториальная Гвинея","flag":"🇬🇶"},
  {"name":"Габон","flag":"🇬🇦"},{"name":"ЦАР","flag":"🇨🇫"},
  {"name":"Намибия","flag":"🇳🇦"},{"name":"Ботсвана","flag":"🇧🇼"},
  {"name":"Лесото","flag":"🇱🇸"},{"name":"Эсватини","flag":"🇸🇿"},
  {"name":"Малави","flag":"🇲🇼"},{"name":"Мадагаскар","flag":"🇲🇬"},
  {"name":"Маврикий","flag":"🇲🇺"},{"name":"Сейшелы","flag":"🇸🇨"},
  {"name":"Коморы","flag":"🇰🇲"},{"name":"Сан-Томе и Принсипи","flag":"🇸🇹"},
  // Северная и Центральная Америка
  {"name":"США","flag":"🇺🇸"},{"name":"Канада","flag":"🇨🇦"},
  {"name":"Мексика","flag":"🇲🇽"},{"name":"Куба","flag":"🇨🇺"},
  {"name":"Гаити","flag":"🇭🇹"},{"name":"Доминиканская Республика","flag":"🇩🇴"},
  {"name":"Ямайка","flag":"🇯🇲"},{"name":"Тринидад и Тобаго","flag":"🇹🇹"},
  {"name":"Панама","flag":"🇵🇦"},{"name":"Коста-Рика","flag":"🇨🇷"},
  {"name":"Никарагуа","flag":"🇳🇮"},{"name":"Гондурас","flag":"🇭🇳"},
  {"name":"Сальвадор","flag":"🇸🇻"},{"name":"Гватемала","flag":"🇬🇹"},
  {"name":"Белиз","flag":"🇧🇿"},{"name":"Багамы","flag":"🇧🇸"},
  {"name":"Барбадос","flag":"🇧🇧"},{"name":"Сент-Люсия","flag":"🇱🇨"},
  {"name":"Гренада","flag":"🇬🇩"},{"name":"Антигуа и Барбуда","flag":"🇦🇬"},
  {"name":"Доминика","flag":"🇩🇲"},{"name":"Сент-Китс и Невис","flag":"🇰🇳"},
  {"name":"Сент-Винсент и Гренадины","flag":"🇻🇨"},
  // Южная Америка
  {"name":"Бразилия","flag":"🇧🇷"},{"name":"Аргентина","flag":"🇦🇷"},
  {"name":"Колумбия","flag":"🇨🇴"},{"name":"Перу","flag":"🇵🇪"},
  {"name":"Чили","flag":"🇨🇱"},{"name":"Венесуэла","flag":"🇻🇪"},
  {"name":"Боливия","flag":"🇧🇴"},{"name":"Парагвай","flag":"🇵🇾"},
  {"name":"Уругвай","flag":"🇺🇾"},{"name":"Эквадор","flag":"🇪🇨"},
  {"name":"Гайана","flag":"🇬🇾"},{"name":"Суринам","flag":"🇸🇷"},
  // Океания
  {"name":"Австралия","flag":"🇦🇺"},{"name":"Новая Зеландия","flag":"🇳🇿"},
  {"name":"Папуа — Новая Гвинея","flag":"🇵🇬"},{"name":"Фиджи","flag":"🇫🇯"},
  {"name":"Соломоновы Острова","flag":"🇸🇧"},{"name":"Вануату","flag":"🇻🇺"},
  {"name":"Самоа","flag":"🇼🇸"},{"name":"Кирибати","flag":"🇰🇮"},
  {"name":"Тонга","flag":"🇹🇴"},{"name":"Микронезия","flag":"🇫🇲"},
  {"name":"Палау","flag":"🇵🇼"},{"name":"Маршалловы Острова","flag":"🇲🇭"},
  {"name":"Науру","flag":"🇳🇷"},{"name":"Тувалу","flag":"🇹🇻"},
];

// ── Helpers ───────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randId(n = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < n; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── DOM refs ──────────────────────────────────────────────────────
const screens = {
  start:  document.getElementById('start-screen'),
  game:   document.getElementById('game-screen'),
  result: document.getElementById('result-screen'),
};

const flagEmoji  = document.getElementById('flag-emoji');
const flagStage  = document.getElementById('flag-stage');
const optBtns    = [...document.querySelectorAll('.opt-btn')];
const feedback   = document.getElementById('feedback');
const timerText  = document.getElementById('timer-text');
const ringFill   = document.getElementById('ring-fill');
const scoreC     = document.getElementById('score-correct');
const scoreW     = document.getElementById('score-wrong');

const resCorrect = document.getElementById('res-correct');
const resWrong   = document.getElementById('res-wrong');
const resTotal   = document.getElementById('res-total');
const pctFill    = document.getElementById('pct-fill');
const pctText    = document.getElementById('pct-text');
const shareUrl   = document.getElementById('share-url');
const copyBtn    = document.getElementById('copy-btn');
const btnStart   = document.getElementById('btn-start');
const btnAgain   = document.getElementById('btn-again');

// ── State ─────────────────────────────────────────────────────────
const DURATION = 60;
const CIRCUMFERENCE = 2 * Math.PI * 50;

let correct = 0, wrong = 0;
let timeLeft = DURATION;
let timerInterval   = null;
let currentQuestion = null;
let answered        = false;
let queue           = [];

// ── Screen management ─────────────────────────────────────────────
function show(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Timer ring ────────────────────────────────────────────────────
function updateRing(secs) {
  const frac   = secs / DURATION;
  const offset = CIRCUMFERENCE * (1 - frac);
  ringFill.style.strokeDashoffset = offset;
  ringFill.style.stroke =
    frac > .5 ? 'url(#timerGrad)' :
    frac > .2 ? '#f5c842' : '#f4536a';
}

function startTimer() {
  timeLeft = DURATION;
  timerText.textContent = timeLeft;
  updateRing(timeLeft);
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;
    updateRing(timeLeft);
    if (timeLeft <= 0) endGame();
  }, 1000);
}

// ── Question generation ───────────────────────────────────────────
function nextQuestion() {
  if (queue.length === 0) queue = shuffle(COUNTRIES);
  const correct_country = queue.pop();
  const others = shuffle(COUNTRIES.filter(c => c.name !== correct_country.name)).slice(0, 3);
  const options = shuffle([...others, correct_country]);
  return { flag: correct_country.flag, correct: correct_country.name, options: options.map(c => c.name) };
}

// ── Load question ─────────────────────────────────────────────────
async function loadQuestion() {
  answered = false;
  feedback.textContent = '';
  feedback.className   = 'feedback';
  optBtns.forEach(b => { b.disabled = false; b.className = 'opt-btn'; });

  flagStage.classList.add('flip');
  await sleep(200);

  currentQuestion = nextQuestion();

  flagEmoji.textContent = currentQuestion.flag;
  currentQuestion.options.forEach((opt, i) => {
    optBtns[i].querySelector('.opt-text').textContent = opt;
  });

  flagStage.classList.remove('flip');
}

// ── Answer handling ───────────────────────────────────────────────
async function handleAnswer(idx) {
  if (answered || !currentQuestion) return;
  answered = true;

  const chosen  = currentQuestion.options[idx];
  const isRight = chosen === currentQuestion.correct;

  optBtns.forEach((b, i) => {
    b.disabled = true;
    const name = currentQuestion.options[i];
    if (name === currentQuestion.correct) b.classList.add('correct');
    else if (i === idx && !isRight)        b.classList.add('wrong');
  });

  if (isRight) {
    correct++;
    scoreC.textContent = correct;
    feedback.textContent = '✓ Правильно!';
    feedback.className   = 'feedback correct-fb';
  } else {
    wrong++;
    scoreW.textContent = wrong;
    feedback.textContent = `✗ Это ${currentQuestion.correct}`;
    feedback.className   = 'feedback wrong-fb';
  }

  await sleep(900);
  loadQuestion();
}

// ── End game ──────────────────────────────────────────────────────
function endGame() {
  clearInterval(timerInterval);
  show('result');

  resCorrect.textContent = correct;
  resWrong.textContent   = wrong;
  resTotal.textContent   = correct + wrong;

  const total = correct + wrong;
  const pct   = total > 0 ? Math.round(correct / total * 100) : 0;

  requestAnimationFrame(() => {
    pctFill.style.width = pct + '%';
    pctText.textContent = pct + '% правильных';
  });

  const trophy = document.getElementById('result-trophy');
  trophy.textContent = pct >= 80 ? '🏆' : pct >= 50 ? '🥈' : '🌍';

  // Save result to localStorage and generate shareable link
  const rid = randId();
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const resultData = { correct, wrong, total, created_at: now };
  try {
    localStorage.setItem('flags_result_' + rid, JSON.stringify(resultData));
  } catch (e) { /* localStorage might be unavailable */ }

  // Build share URL: result.html#<rid>
  const base = location.href.replace(/\/[^/]*$/, '/');
  shareUrl.value = base + 'result.html#' + rid;
}

// ── Copy button ───────────────────────────────────────────────────
copyBtn?.addEventListener('click', () => {
  const val = shareUrl.value;
  if (!val || val === '—') return;
  navigator.clipboard.writeText(val).catch(() => {
    shareUrl.select(); document.execCommand('copy');
  });
  copyBtn.classList.add('copied');
  setTimeout(() => copyBtn.classList.remove('copied'), 1500);
});

// ── Game start ────────────────────────────────────────────────────
function startGame() {
  correct = 0; wrong = 0;
  queue   = shuffle(COUNTRIES);
  scoreC.textContent = '0';
  scoreW.textContent = '0';
  show('game');
  startTimer();
  loadQuestion();
}

btnStart?.addEventListener('click', startGame);
btnAgain?.addEventListener('click', startGame);

// ── Option buttons ────────────────────────────────────────────────
optBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => handleAnswer(i));
});

// ── Keyboard shortcuts ────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (!screens.game.classList.contains('active')) return;
  const map = {'1':0,'2':1,'3':2,'4':3};
  if (e.key in map) handleAnswer(map[e.key]);
});
