// Музыкальный плеер
const musicPlayer = document.getElementById('music-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');

// Список треков
const songs = [
  {
    name: 'song1',
    title: 'La mania',
    artist: 'Rilès',
    cover: "https://nrksu1tan.github.io/nrksu1tan/assets/music/song1.mp3"
  },
  // Добавь больше треков при необходимости
];

let songIndex = 0;

// Загрузка информации о треке
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `https://nrksu1tan.github.io/nrksu1tan/assets/music/${song.name}.mp3`;
  cover.src = song.cover;
}

// Инициализация
loadSong(songs[songIndex]);

// Воспроизведение песни
function playSong() {
  musicPlayer.classList.add('play');
  playBtn.innerHTML = `<i class='bx bx-pause'></i>`;
  audio.play();
}

// Пауза песни
function pauseSong() {
  musicPlayer.classList.remove('play');
  playBtn.innerHTML = `<i class='bx bx-play'></i>`;
  audio.pause();
}

// Предыдущий трек
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Следующий трек
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Обновление прогресса
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Перемотка песни
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Изменение громкости
function changeVolume(e) {
  audio.volume = e.target.value;
  updateVolumeIcon();
}

// Обновление иконки громкости
function updateVolumeIcon() {
  if (audio.volume === 0) {
    volumeIcon.className = 'bx bxs-volume-mute';
  } else if (audio.volume > 0 && audio.volume <= 0.5) {
    volumeIcon.className = 'bx bxs-volume-low';
  } else {
    volumeIcon.className = 'bx bxs-volume-full';
  }
}

// Установка начальной громкости 10%
audio.volume = 0.01; // Устанавливаем громкость на 10%
volumeSlider.value = 0.01; // Обновляем значение ползунка громкости
updateVolumeIcon(); // Обновляем иконку громкости
loadSong(songs[songIndex]); // Загружаем первую песню
playSong(); // Автоматически начинаем воспроизведение

// Отключение/включение звука при клике на иконку
function toggleMute() {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    audio.volume = 1;
    volumeSlider.value = 1;
  }
  updateVolumeIcon();
}

// События
playBtn.addEventListener('click', () => {
  const isPlaying = musicPlayer.classList.contains('play');
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

volumeSlider.addEventListener('input', changeVolume);

volumeIcon.addEventListener('click', toggleMute);


const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Обновление времени
function updateTime(e) {
  const { duration, currentTime } = e.srcElement;

  // Обновление текущего времени
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

  // Обновление общей длительности
  if (duration) {
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  }
}

// Обновляем событие timeupdate
audio.addEventListener('timeupdate', (e) => {
  updateProgress(e);
  updateTime(e);
});
