const fortunes = [
  "An exciting opportunity lies ahead of you.",
  "Happiness begins with facing life with a smile and a wink.",
  "A fresh start will put you on your way.",
  "You will travel to many exotic places in your lifetime.",
  "A lifetime of happiness lies ahead of you.",
  "Now is the time to try something new.",
  "Your abilities are unparalleled.",
  "You are the master of every situation.",
  "A faithful friend is a strong defense.",
  "From now on your kindness will lead you to success.",
  "You will soon embark on a business venture.",
  "Your hard work will soon pay off.",
  "The early bird gets the worm, but the second mouse gets the cheese.",
  "A pleasant surprise is waiting for you.",
  "Adventure can be real happiness.",
  "All your hard work will soon pay off.",
  "Believe it can be done.",
  "Your road to glory will be rocky, but fulfilling.",
  "You will receive a fortune cookie. This is it.",
  "Dreams are the touchstones of our character."
];

const $ = (sel) => document.querySelector(sel);

const cookie = $("#cookie");
const leftHalf = $("#cookie-left");
const rightHalf = $("#cookie-right");
const paper = $("#fortune-paper");
const textEl = $("#fortune-text");
const crackBtn = $("#crack-btn");
const liveRegion = $("#live-region");
const confettiCanvas = $("#confetti-canvas");
const ctx = confettiCanvas.getContext("2d", { alpha: true });

let isAnimating = false;

// Confetti system
const confettiPieces = [];
function spawnConfettiBurst(centerX, centerY, count = 120) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 5;
    confettiPieces.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 2 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: randomConfettiColor(),
      life: 90 + Math.random() * 60
    });
  }
}

function randomConfettiColor() {
  const palette = [
    "#7aa2ff", "#ff7ad9", "#ffd86b", "#8ef6a0", "#f6c66e", "#c99e44", "#e7ebff"
  ];
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
    p.vy += 0.08; // gravity
    p.vx *= 0.995;
    p.vy *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 1;

    if (p.life <= 0 || p.y > window.innerHeight + 40) {
      confettiPieces.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / 120);
    const w = p.size * (0.8 + Math.abs(Math.sin(p.rot)) * 0.6);
    const h = p.size;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }

  requestAnimationFrame(tickConfetti);
}

// Typewriter
async function typeText(text) {
  textEl.textContent = "";
  document.body.classList.add("typing");
  for (let i = 0; i <= text.length; i++) {
    textEl.textContent = text.slice(0, i);
    await wait(18 + Math.random() * 24);
  }
  document.body.classList.remove("typing");
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function pickFortune() {
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

async function crackCookie() {
  if (isAnimating) return;
  isAnimating = true;

  cookie.classList.remove("cracked");
  paper.style.opacity = "0";
  textEl.textContent = "";

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

  await wait(600);
  isAnimating = false;
}

function setup() {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  requestAnimationFrame(tickConfetti);
  crackBtn.addEventListener("click", crackCookie);
  crackBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      crackCookie();
    }
  });
}

document.addEventListener("DOMContentLoaded", setup);
