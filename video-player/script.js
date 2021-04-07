// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById('video');
const play = document.getElementById('play');
const stop_button = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//functions
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = `<i class='fa fa-play fa-2x'></i>`;
  } else {
    play.innerHTML = `<i class='fa fa-pause fa-2x'></i>`;
  }
}

// currentTime,duration is property of video element
// https://www.w3schools.com/tags/ref_av_dom.asp

// sets progress.value which is from 0 to 100
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// matches video.currentTime to progress.value

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// event listener

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleVideoStatus);
stop_button.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
