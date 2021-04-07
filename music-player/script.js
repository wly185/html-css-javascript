const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukelele'];

loadSong(songs[(songIndex = 0)]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `tracks/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
  // console.log(audio.src);
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i').classList.remove('fa-pause');
  playBtn.querySelector('i').classList.add('fa-play');
  audio.pause();
}
function playSong() {
  musicContainer.classList.add('play');
  // console.log(musicContainer.classList);
  playBtn.querySelector('i').classList.remove('fa-play');
  // console.log(playBtn.querySelector('i').classList);
  playBtn.querySelector('i').classList.add('fa-pause');
  audio.play();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  // console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  // console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.target;
  // console.log(duration, currentTime, 'e');
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  // console.log(this);
  // console.log(progressContainer);
  console.log(e.target);
  const width = this.clientWidth;
  // console.log(width);

  const clickX = e.offsetX;
  // console.log(clickX);
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
  // console.log(musicContainer);
  // console.log(musicContainer.classList);
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
