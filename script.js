
const songs = [
  {
    title: "song 1",
    artist: "Unknown",
    file: "song2.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "song 2",
    artist: "Unknown",
    file: "song1.mp3",
    cover: "images/cover2.jpg"
  },
  {
    title: "song 3",
    artist: "Unknown",
    file: "song4.mp3",
    cover: "images/cover3.jpg"
  },
  {
    title: "Song 4",
    artist: "Unknown",
    file: "song3.mp3",
    cover: "images/cover1.jpg"
  }
];


const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const albumArt = document.getElementById("album-art");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

let currentSong = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `music/${song.file}`;
  albumArt.src = song.cover;
  
}

function playSong() {
  audio.play();
  playBtn.innerText = "⏸️";
  
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶️";
  albumArt.classList.remove("rotate");
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function updateProgress() {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
}

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// Initial load
loadSong(songs[currentSong]);
