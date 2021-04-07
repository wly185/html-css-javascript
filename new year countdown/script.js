const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  // console.log(diff);
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  // console.log(day);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  // remainder after you divide by 24
  // console.log(hour);
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? 0 + h : h;
  minutes.innerHTML = m < 10 ? 0 + m : m;
  seconds.innerHTML = s < 10 ? 0 + s : s;
}

// updateCountdown();
setInterval(updateCountdown, 1000);

year.innerHTML = currentYear;

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);
