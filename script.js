const music = document.getElementById("bgMusic");
const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const player = document.querySelector(".player");

/* ===== ФОРМАТ ВРЕМЕНИ ===== */
function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/* ===== ПОКАЗ ДЛИТЕЛЬНОСТИ ===== */
music.addEventListener("loadedmetadata", () => {
  if (music.duration) {
    duration.textContent = formatTime(music.duration);
  }
});

/* ===== PLAY / PAUSE ===== */
playPause.addEventListener("click", () => {

  if (music.paused) {
    music.play().then(() => {
      playPause.textContent = "❚❚";
      player.classList.add("playing"); // ← включает вращение
    });
  } else {
    music.pause();
    playPause.textContent = "▶";
    player.classList.remove("playing"); // ← выключает вращение
  }

});

/* ===== ОБНОВЛЕНИЕ ПРОГРЕССА ===== */
music.addEventListener("timeupdate", () => {

  if (music.duration) {

    const percent = (music.currentTime / music.duration) * 100;

    progress.value = percent;

    /* зелёная линия */
    progress.style.background = `linear-gradient(
      to right,

      #404040 ${percent}%,
      #404040 100%
    )`;

    current.textContent = formatTime(music.currentTime);
    duration.textContent = formatTime(music.duration);
  }

});

/* ===== ПЕРЕМОТКА ===== */
progress.addEventListener("input", () => {
  if (music.duration) {
    music.currentTime = (progress.value / 100) * music.duration;
  }
});

/* ===== ТАЙМЕР СВАДЬБЫ ===== */

const weddingDate = new Date("June 27, 2026 17:00:00").getTime();

setInterval(() => {

  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.querySelector(".timer").innerHTML =
      "<h3>Сегодня наш день ❤️</h3>";
    return;
  }

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("minutes").innerText =
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("seconds").innerText =
    Math.floor((distance % (1000 * 60)) / 1000);

}, 1000);
