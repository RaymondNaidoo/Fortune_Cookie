const fortunes = [
  "A closed mouth gathers no feet.",
  "A friend is a gift you give yourself.",
  "A journey of a thousand miles begins with a single step.",
  "A smooth sea never made a skilled sailor.",
  "Act as if what you do makes a difference. It does.",
  "An inch of time is an inch of gold.",
  "Be the change you wish to see in the world.",
  "Believe it can be done.",
  "Big journeys begin with small steps.",
  "Courtesy is contagious.",
  "Don't let yesterday use up too much of today.",
  "Every flower blooms in its own time.",
  "Every problem has a gift for you in its hands.",
  "Good fortune is always within reach.",
  "Happiness is not a destination, it's a way of life.",
  "If you wish to see it, you must believe it first.",
  "It takes as much energy to wish as it does to plan.",
  "Let the world change you... and you can change the world.",
  "Look within to find your inner strength.",
  "May you have a bright future.",
  "Now is the time to discard all obstacles.",
  "One kind word can change someone's day.",
  "Patience is the key to paradise.",
  "Practice makes perfect.",
  "Quality is never an accident; it is always the result of high intention.",
  "Real riches are the riches possessed inside.",
  "The best is yet to come.",
  "The future belongs to those who believe in their dreams.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "The pen is mightier than the sword.",
  "There is no security on this earth. There is only opportunity.",
  "To be loved, you must first love.",
  "Today, you will find a wallet full of money.",
  "What goes around comes around.",
  "You are always a student; life is your teacher.",
  "A great love is waiting for you.",
  "A smile is your personal welcome sign.",
  "All will be revealed in time.",
  "An unexpected friendship will soon open the door to happiness.",
  "Beauty is in the eye of the beholder.",
  "Better three hours too soon than a minute too late.",
  "Change your thoughts and you change your world.",
  "Conceive it; believe it; achieve it!",
  "Distance means so little when someone means so much.",
  "Each day is a new chance to change your life.",
  "Every exit is an entrance to somewhere else.",
  "Every wise person has a fool for a friend.",
  "Friends are hidden treasures—seek them out.",
  "Good things come to those who hustle.",
  "Happiness will knock on your door.",
  "If you love life, life will love you back.",
  "Love is the silent language of the soul.",
  "Love lights up the world.",
  "May the one you love be true.",
  "New ideas spark new love.",
  "One true friend is worth a thousand acquaintances.",
  "Romance will find you when you least expect it.",
  "Someone is thinking of you right now.",
  "The heart that loves is always young.",
  "The love of your life is stepping into your path.",
  "There is beauty in everything.",
  "True love stories never have endings.",
  "You are the love of someone's life.",
  "You will be blessed with true love.",
  "You will find love where it has been hiding.",
  "A prosperous journey lies ahead.",
  "A wise investment today pays dividends tomorrow.",
  "An unexpected source of income will arrive soon.",
  "At the touch of love, everyone becomes a poet.",
  "Business ventures will pay off handsomely.",
  "Creativity is your greatest asset.",
  "Do one thing every day that scares you.",
  "Financial gain is on the horizon.",
  "Fortune favors the bold.",
  "Get your mind set—confidence will lead you on.",
  "Good news from afar.",
  "Great things are in store for you.",
  "Hard work pays off in the end.",
  "If you want the rainbow, you gotta put up with the rain.",
  "Luck is what happens when preparation meets opportunity.",
  "Money is coming your way.",
  "Opportunities abound for you.",
  "Promotion is just around the corner.",
  "Success is a ladder that cannot be climbed with hands in pockets.",
  "The harder you fall, the higher you bounce.",
  "Wealth awaits you.",
  "What we hope to do with ease, we must first learn to do with diligence.",
  "You will achieve great things.",
  "You will be successful in your work.",
  "Your hard work will soon be rewarded.",
  "A healthy body is a healthy mind.",
  "Cherish your health.",
  "Good health will be yours.",
  "Health is wealth.",
  "If you feel blue, think of a sunny day.",
  "Laughter is the best medicine.",
  "Listen to your heart.",
  "Moderation in all things.",
  "Take care of your health.",
  "The body heals with play, the mind heals with laughter.",
  "Your health is your greatest wealth.",
  "Your spirit will guide you to good health.",
  "A cloudy day is no match for a sunny disposition.",
  "A good time to start was yesterday—keep going!",
  "A little bird told me good news is coming.",
  "Age is merely the number of years the world has been enjoying you.",
  "Always let your conscience be your guide.",
  "An important decision is yours to make.",
  "Behind every great fortune lies a great crime.",
  "Behave yourself—you'll make us proud!",
  "Don't forget: you are fabulous!",
  "Don't worry about the future—it's just today, twice.",
  "Embrace the glorious mess that you are.",
  "Good things take time.",
  "He who laughs, lasts.",
  "Help! I'm talking and I can't shut up!",
  "I am like a butterfly—beautiful to watch but hard to catch.",
  "If you can't beat 'em, rearrange the pieces.",
  "It's not whether you win or lose, but how you play the game.",
  "Life is what you make it—go make it delicious!",
  "May you live every day of your life.",
  "Nothing is impossible to a willing heart.",
  "People are attracted to your radiant energy.",
  "Some achieve greatness; some have it thrust upon them.",
  "The early bird gets the worm, but the night owl gets to party.",
  "The secret of success is sincerity—once you can fake that, you've got it!",
  "Today is the tomorrow you dreamed of yesterday.",
  "Warning: Dates in calendar are closer than they appear.",
  "You are not getting older, you are getting better.",
  "You have a magnetic personality.",
  "You're one-of-a-kind!",
  "Your smile will light up the room.",
  "A goal is a dream with a deadline.",
  "All things are difficult before they are easy.",
  "Believe in yourself and others will too.",
  "Challenges are what make life interesting.",
  "Dream big and dare to fail.",
  "Every moment is a fresh beginning.",
  "Fly high and your fears will fall.",
  "Great ability develops and reveals itself increasingly with every attempt.",
  "If you can dream it, you can do it.",
  "Keep your face to the sunshine and you cannot see a shadow.",
  "Life is a journey, not a destination.",
  "Make each day your masterpiece.",
  "No one can make you feel inferior without your consent.",
  "Persevere and you will succeed.",
  "Rise above the storm and you will find the sunshine.",
  "The best way out is always through.",
  "You are capable of amazing things.",
  "Your destiny awaits—go claim it!"
];

const $ = (sel) => document.querySelector(sel);

const cookie = $("#cookie");
const paper = $("#fortune-paper");
const textEl = $("#fortune-text");
const crackBtn = $("#crack-btn");
const redoBtn = $("#redo-btn");
const liveRegion = $("#live-region");
const confettiCanvas = $("#confetti-canvas");
const ctx = confettiCanvas.getContext("2d", { alpha: true });

let isAnimating = false;

/* Confetti */
const confettiPieces = [];
function spawnConfettiBurst(centerX, centerY, count = 120) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 5;
    confettiPieces.push({
      x: centerX, y: centerY,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2,
      size: 2 + Math.random() * 5,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      color: randomConfettiColor(), life: 90 + Math.random() * 60
    });
  }
}
function randomConfettiColor() {
  const palette = ["#7aa2ff", "#ff7ad9", "#ffd86b", "#8ef6a0", "#f6c66e", "#c99e44", "#e7ebff"];
  return palette[Math.floor(Math.random() * palette.length)];
}
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  confettiCanvas.width = Math.floor(window.innerWidth * dpr);
  confettiCanvas.height = Math.floor(window.innerHeight * dpr);
  confettiCanvas.style.width = window.innerWidth + "px";
  confettiCanvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function tickConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const p = confettiPieces[i];
    p.vy += 0.08; p.vx *= 0.995; p.vy *= 0.995;
    p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1;
    if (p.life <= 0 || p.y > window.innerHeight + 40) { confettiPieces.splice(i, 1); continue; }
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, p.life / 120);
    const w = p.size * (0.8 + Math.abs(Math.sin(p.rot)) * 0.6); const h = p.size;
    ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore();
  }
  requestAnimationFrame(tickConfetti);
}

/* Off-screen measurer for precise widths */
let measurer;
function ensureMeasurer() {
  if (measurer) return measurer;
  measurer = document.createElement("span");
  measurer.style.position = "absolute";
  measurer.style.visibility = "hidden";
  measurer.style.pointerEvents = "none";
  measurer.style.whiteSpace = "nowrap";
  const cs = getComputedStyle(textEl);
  measurer.style.fontFamily = cs.fontFamily;
  measurer.style.fontSize = cs.fontSize;
  measurer.style.fontWeight = cs.fontWeight;
  measurer.style.letterSpacing = cs.letterSpacing;
  document.body.appendChild(measurer);
  return measurer;
}

function cookieMaxWidthPx() {
  const rect = cookie.getBoundingClientRect();
  return Math.max(0, Math.floor(rect.width * 0.80)); // paper fits within 80% of cookie width
}

function viewportClampPx() {
  return Math.max(0, window.innerWidth - 24); // match margins from CSS
}

/* Compute width: hug text if short, clamp and wrap if long */
function syncPaperSize() {
  const m = ensureMeasurer();
  m.textContent = textEl.textContent;
  const measured = m.getBoundingClientRect().width; // single-line width
  const pad = 32; // padding-left + padding-right (16 + 16)
  const maxAllowed = Math.min(cookieMaxWidthPx(), viewportClampPx());
  const desired = Math.ceil(measured + pad);

  if (desired <= maxAllowed) {
    paper.classList.remove("wrap");
    paper.style.width = desired + "px";
  } else {
    paper.classList.add("wrap");
    paper.style.width = maxAllowed + "px";
  }
}

/* Ensure paper height stays inside cookie; scale text down if needed */
function fitTextToPaper() {
  const cookieRect = cookie.getBoundingClientRect();
  const maxPaperHeight = Math.floor(cookieRect.height * 0.38); // allowed vertical space
  const minFont = 12;
  const baseFont = 16; // default Inter size
  let current = parseFloat(getComputedStyle(textEl).fontSize) || baseFont;

  let guard = 0;
  while (paper.getBoundingClientRect().height > maxPaperHeight && current > minFont && guard < 30) {
    current -= 1;
    textEl.style.fontSize = current + "px";
    guard++;
  }
}

/* Typewriter with dynamic wrapping */
async function typeText(text) {
  textEl.style.fontSize = ""; // reset any previous downscaling
  textEl.textContent = "";
  paper.style.width = "32px";  // baseline padding
  document.body.classList.add("typing");

  for (let i = 0; i <= text.length; i++) {
    textEl.textContent = text.slice(0, i);
    syncPaperSize();           // adjust width/enable wrapping as needed
    await wait(18 + Math.random() * 24);
  }

  document.body.classList.remove("typing");
  fitTextToPaper();            // final pass to prevent vertical overflow
}

function wait(ms) { return new Promise((res) => setTimeout(res, ms)); }
function pickFortune() { return fortunes[Math.floor(Math.random() * fortunes.length)]; }

function resetCookie() {
  cookie.classList.remove("cracked");
  paper.style.opacity = "0";
  textEl.textContent = "";
  textEl.style.fontSize = "";
  paper.setAttribute("aria-hidden", "true");
  paper.classList.remove("wrap");
  paper.style.width = "32px";
  liveRegion.textContent = "";
  redoBtn.hidden = true;
  crackBtn.disabled = false;
}

async function crackCookie() {
  if (isAnimating) return;
  isAnimating = true;

  cookie.classList.remove("cracked");
  paper.style.opacity = "0";
  textEl.textContent = "";
  textEl.style.fontSize = "";
  paper.classList.remove("wrap");
  paper.style.width = "32px";

  await wait(40);
  cookie.classList.add("cracked");

  const rect = cookie.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height * 0.45;
  spawnConfettiBurst(cx, cy, 160);

  await wait(300);
  const fortune = pickFortune();
  paper.setAttribute("aria-hidden", "false");
  await typeText(fortune);
  liveRegion.textContent = "Fortune: " + fortune;

  redoBtn.hidden = false;
  crackBtn.disabled = true;

  await wait(600);
  isAnimating = false;
}

function setup() {
  ensureMeasurer();
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    syncPaperSize();
    fitTextToPaper();
  }, { passive: true });
  requestAnimationFrame(tickConfetti);

  crackBtn.addEventListener("click", crackCookie);
  crackBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); crackCookie(); }
  });

  redoBtn.addEventListener("click", async () => {
    resetCookie();
    await wait(150);
    crackCookie();
  });
}

document.addEventListener("DOMContentLoaded", setup);
