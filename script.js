/* Large fortunes list omitted here for brevity. Keep your existing list or paste it below. */
const fortunes = [
  "A closed mouth gathers no feet.",
  "A friend is a gift you give yourself.",
  "A journey of a thousand miles begins with a single step.",
  "A smooth sea never made a skilled sailor.",
  "Act as if what you do makes a difference. It does.",
  "An inch of time is an inch of gold.",
  "Be the change you wish to see in the world.",
  "Believe it can be done.",
  // ... include the full list you provided earlier ...
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

/* Off-screen measurer to get accurate width on mobile */
let measurer;
function ensureMeasurer() {
  if (measurer) return measurer;
  measurer = document.createElement("span");
  measurer.style.position = "absolute";
  measurer.style.visibility = "hidden";
  measurer.style.whiteSpace = "nowrap";
  measurer.style.pointerEvents = "none";
  // Mirror .fortune-text font styles for accuracy
  const cs = getComputedStyle(textEl);
  measurer.style.fontFamily = cs.fontFamily;
  measurer.style.fontSize = cs.fontSize;
  measurer.style.fontWeight = cs.fontWeight;
  measurer.style.letterSpacing = cs.letterSpacing;
  document.body.appendChild(measurer);
  return measurer;
}

function clampPaperWidth(px) {
  const cap = Math.max(0, window.innerWidth - 24); // matches CSS max-width clamp
  return Math.min(px, cap);
}

function syncPaperWidth() {
  const m = ensureMeasurer();
  m.textContent = textEl.textContent;
  const measured = m.getBoundingClientRect().width;
  const cs = getComputedStyle(paper);
  const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const target = Math.ceil(measured + pad);
  paper.style.width = clampPaperWidth(target) + "px";
}

async function typeText(text) {
  textEl.textContent = "";
  paper.style.width = "32px";
  document.body.classList.add("typing");
  for (let i = 0; i <= text.length; i++) {
    textEl.textContent = text.slice(0, i);
    syncPaperWidth();
    await wait(18 + Math.random() * 24);
  }
  document.body.classList.remove("typing");
}

function wait(ms) { return new Promise((res) => setTimeout(res, ms)); }
function pickFortune() { return fortunes[Math.floor(Math.random() * fortunes.length)]; }

function resetCookie() {
  cookie.classList.remove("cracked");
  paper.style.opacity = "0";
  textEl.textContent = "";
  paper.setAttribute("aria-hidden", "true");
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
  window.addEventListener("resize", () => { resizeCanvas(); syncPaperWidth(); }, { passive: true });
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
