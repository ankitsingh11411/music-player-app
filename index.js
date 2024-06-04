const image = document.getElementById('cover'),
  title = document.getElementById('music-title'),
  artist = document.getElementById('music-artist'),
  currentTimeEl = document.getElementById('current-time'),
  durationEl = document.getElementById('duration'),
  progress = document.getElementById('progress'),
  playerProgress = document.getElementById('player-progress'),
  prevBtn = document.getElementById('prev'),
  nextBtn = document.getElementById('next'),
  playBtn = document.getElementById('play'),
  background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
  {
    path: 'assets/audiofiles/gta.mp3',
    displayName: 'GTA San Andreas theme',
    cover: 'assets/imagefiles/911gt3.png',
    artist: 'Rstar',
  },
  {
    path: 'assets/audiofiles/lastnite.mp3',
    displayName: 'Last Nite',
    cover: 'assets/imagefiles/rsv4nd.png',
    artist: '916 Frosty',
  },
  {
    path: 'assets/audiofiles/lossescrew.mp3',
    displayName: 'Loosescrew',
    cover: 'assets/imagefiles/rrrnd.png',
    artist: 'BONES',
  },
  {
    path: 'assets/audiofiles/lostsoul.mp3',
    displayName: 'LOST SOUL',
    cover: 'assets/imagefiles/m1kemw.png',
    artist: 'NBSPLV',
  },
  {
    path: 'assets/audiofiles/nldcccdi.mp3',
    displayName: 'Diera City Can Demir instrumental',
    cover: 'assets/imagefiles/m1krm.png',
    artist: 'Can Demir',
  },
  {
    path: 'assets/audiofiles/nldcci.mp3',
    displayName: 'Diera city center instrumental',
    cover: 'assets/imagefiles/pv4rrrw.png',
    artist: 'Night Lovell',
  },
  {
    path: 'assets/audiofiles/nloasr.mp3',
    displayName: 'Off Air instrumental slowed + reverb',
    cover: 'assets/imagefiles/rsv4e5.png',
    artist: 'Night Lovell',
  },
  {
    path: 'assets/audiofiles/smtw2.mp3',
    displayName: 'Show me the will 2',
    cover: 'assets/imagefiles/zx10rmw.png',
    artist: 'Sx1nxwy',
  },
  {
    path: 'assets/audiofiles/tmni.mp3',
    displayName: 'Too many naights instrumental',
    cover: 'assets/imagefiles/pv4night.png',
    artist: 'Don Toliver',
  },
  {
    path: 'assets/audiofiles/tsmebpe.mp3',
    displayName: 'My Eyes best part extended slowed reverb',
    cover: 'assets/imagefiles/zx10ug.png',
    artist: 'Travis Scott',
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace('fa-play', 'fa-pause');
  // Set button hover title
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace('fa-pause', 'fa-play');
  // Set button hover title
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
