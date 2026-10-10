// Birthday surprise for Mubeen — made with love by Ibrar.
// Change the password in the PASSWORD constant below.
const PASSWORD = "2011"; // Change this to any secret word you both know.
const BIRTHDAY = "2026-10-11";
const screens = [...document.querySelectorAll(".screen")];
const toast = document.getElementById("toast");
let photoUrls = [];

function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}
document.getElementById("unlockForm").addEventListener("submit", e => {
  e.preventDefault();
  const entered = document.getElementById("password").value.trim().toLowerCase();
  if (entered === PASSWORD.toLowerCase()) {
    document.getElementById("gateError").textContent = "";
    showScreen("welcome");
    sprinkle(24);
  } else {
    document.getElementById("gateError").textContent = "Almost! Try the name of your favourite person 💗";
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
  }
});
document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.go)));
document.getElementById("backToWelcome").addEventListener("click", () => showScreen("welcome"));
document.getElementById("openGift").addEventListener("click", () => {
  document.getElementById("giftReveal").classList.remove("hidden");
  document.getElementById("openGift").classList.add("opened");
  document.getElementById("openGift").setAttribute("aria-label", "Gift opened");
  sprinkle(36);
  showToast("A whole lot of love, just for you 💝");
});

function sprinkle(count=20) {
  const emojis = ["💗","💕","💖","✨","🌸","💞","⭐"];
  for (let i=0; i<count; i++) {
    const el = document.createElement("span");
    el.className = "floaty";
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    el.style.left = Math.random()*100 + "vw";
    el.style.fontSize = (14 + Math.random()*20) + "px";
    el.style.animationDuration = (3 + Math.random()*4) + "s";
    document.getElementById("floaties").appendChild(el);
    setTimeout(() => el.remove(), 7500);
  }
}
setInterval(() => {
  if (Math.random() > .45) sprinkle(1);
}, 1800);

document.getElementById("photoUpload").addEventListener("change", e => {
  const files = [...e.target.files].filter(f => f.type.startsWith("image/"));
  const grid = document.getElementById("galleryGrid");
  files.forEach(file => {
    const url = URL.createObjectURL(file); photoUrls.push(url);
    const tile = document.createElement("div"); tile.className = "memory-tile photo";
    const img = document.createElement("img"); img.src = url; img.alt = "A special memory";
    const caption = document.createElement("p"); caption.textContent = file.name.replace(/\.[^.]+$/, "").slice(0,28) || "A sweet memory";
    tile.append(img, caption); grid.prepend(tile);
  });
  if (files.length) showToast(`${files.length} photo${files.length===1?"":"s"} added to your memory corner 📸`);
  e.target.value = "";
});

const candles = [...document.querySelectorAll(".candle")];
candles.forEach(c => c.addEventListener("click", () => {
  c.classList.toggle("lit");
  c.textContent = c.classList.contains("lit") ? "🕯️" : "♨️";
  if (candles.every(x => !x.classList.contains("lit"))) {
    document.getElementById("wishText").textContent = "Candles out! Your wish is on its way to the stars. 🌟";
    sprinkle(18);
  }
}));
document.getElementById("wishBtn").addEventListener("click", () => {
  document.getElementById("finalNote").classList.remove("hidden");
  document.getElementById("wishText").textContent = "Wish made! May beautiful things find you this year. 💗";
  candles.forEach(c => { c.classList.remove("lit"); c.textContent = "♨️"; });
  sprinkle(45);
  showToast("Wish sent to the universe ✨");
});

// Keep the birthday date in one easy-to-find place for future customisation.
document.documentElement.dataset.birthday = BIRTHDAY;


// Promise form: shows her message on this page (it is not sent to a server).
document.getElementById("promiseForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("promiseName").value.trim() || "Meri Mubeen";
  const promise = document.getElementById("promiseText").value.trim();
  if (!promise) return;
  const reply = document.getElementById("promiseReply");
  reply.replaceChildren();
  const heading = document.createElement("h2");
  heading.textContent = `Tumhari baat, ${name} 💗`;
  const message = document.createElement("p");
  message.textContent = `“${promise}”`;
  const note = document.createElement("p");
  note.textContent = "Ibrar, is baat ko pyaar se padhna aur us par dil se baat karna. ❤️";
  reply.append(heading, message, note);
  reply.classList.remove("hidden");
  sprinkle(18);
  showToast("Tumhari baat yahan likh di gayi hai 💌");
});
