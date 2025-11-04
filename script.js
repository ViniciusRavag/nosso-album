document.addEventListener('DOMContentLoaded', () => {

  /*
    INSTRUÇÕES PARA ADICIONAR SUAS MÚSICAS:

    1. Crie uma pasta `music` e coloque seus arquivos .mp3 nela.
    2. Crie uma pasta `images` e coloque as imagens de capa (.jpg, .png) nela.
    3. Edite a lista `PLAYLIST` abaixo:
      - 'id': Um número único para cada música (1, 2, 3, ...).
      - 'title': O título da música.
      - 'artist': O nome do artista.
      - 'src': O caminho para o arquivo de música. Ex: 'music/sua-musica.mp3'.
      - 'coverArt': O caminho para a imagem da capa. Ex: 'images/sua-capa.jpg'.
      - 'lyrics': A letra da música. Use `\n` para quebras de linha.

    Abaixo está uma lista de exemplo com músicas de uso livre para demonstração.
    Substitua esta lista pela sua playlist pessoal.
  */
  const PLAYLIST = [
    {
      id: 1,
      title: "Te amo tudo que dá",
      artist: "Vivi",
      src: "https://cdn.pixabay.com/download/audio/2022/01/20/audio_291d2ac2ac.mp3?filename=inspiring-cinematic-ambient-116199.mp3", // Substitua por: 'music/sua-musica-1.mp3'
      coverArt: "https://picsum.photos/500/500?random=1", // Substitua por: 'images/sua-capa-1.jpg'
      lyrics: `(Letra da primeira música)\n\nVerso 1\nCada momento com você é especial\nUm amor que transcende o normal\n\nRefrão\nEsta canção é para você, meu amor\nUm símbolo do nosso eterno calor\n\nVerso 2\nSeu sorriso ilumina o meu dia\nCom você, a vida é pura alegria.`
    },
    {
      id: 2,
      title: "Casa",
      artist: "Vivi",
      src: "https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde64b24c.mp3?filename=the-beat-of-nature-122841.mp3", // Substitua por: 'music/sua-musica-2.mp3'
      coverArt: "https://picsum.photos/500/500?random=2", // Substitua por: 'images/sua-capa-2.jpg'
      lyrics: `(Letra da segunda música)\n\nVerso 1\nLembro do dia em que te conheci\nO mundo parou, e eu só vi você ali\n\nRefrão\nNossa história, escrita nas estrelas\nUm conto de fadas, das mais belas\n\nVerso 2\nCada passo juntos, uma nova canção\nUm amor que cresce no coração.`
    },
    {
      id: 3,
      title: "Thico",
      artist: "Seu Nome",
      src: "https://cdn.pixabay.com/download/audio/2021/11/23/audio_851481b374.mp3?filename=lifelike-126735.mp3", // Substitua por: 'music/sua-musica-3.mp3'
      coverArt: "https://picsum.photos/500/500?random=3", // Substitua por: 'images/sua-capa-3.jpg'
      lyrics: `(Letra da terceira música)\n\nVerso 1\nA vida nos uniu de um jeito perfeito\nUm amor puro, guardado no peito\n\nRefrão\nJuntos para sempre, é o que eu quero\nUm amor sincero, em que prospero\n\nPonte\nE em cada amanhecer\nEu escolho amar você.`
    },
    {
      id: 4,
      title: "Princeso",
      artist: "Vivi",
      src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_15dfb72b93.mp3?filename=in-the-forest-99159.mp3", // Substitua por: 'music/sua-musica-4.mp3'
      coverArt: "https://picsum.photos/500/500?random=4", // Substitua por: 'images/sua-capa-4.jpg'
      lyrics: `(Letra da quarta música)\n\nVerso 1\nQuando a tempestade vem me abalar\nÉ no seu abraço que encontro meu lugar\n\nRefrão\nVocê é meu porto seguro, minha paz\nA certeza de que o amor tudo refaz\n\nVerso 2\nContigo ao meu lado, não temo o perigo\nVocê é meu farol, meu melhor abrigo.`
    },
    {
      id: 5,
      title: "Abecedablio",
      artist: "Vivi",
      src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_15dfb72b93.mp3?filename=in-the-forest-99159.mp3", // Substitua por: 'music/sua-musica-4.mp3'
      coverArt: "https://picsum.photos/500/500?random=4", // Substitua por: 'images/sua-capa-4.jpg'
      lyrics: `(Letra da quarta música)\n\nVerso 1\nQuando a tempestade vem me abalar\nÉ no seu abraço que encontro meu lugar\n\nRefrão\nVocê é meu porto seguro, minha paz\nA certeza de que o amor tudo refaz\n\nVerso 2\nContigo ao meu lado, não temo o perigo\nVocê é meu farol, meu melhor abrigo.`
  ];

  // State variables
  let currentTrackIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let repeatMode = 'off'; // 'off', 'one', 'playlist'

  // DOM Elements
  const audio = document.getElementById('audio-player');
  const coverArt = document.getElementById('cover-art');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const shuffleBtn = document.getElementById('shuffle-btn');
  const repeatBtn = document.getElementById('repeat-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const playlistList = document.getElementById('playlist-list');
  const lyricsText = document.getElementById('lyrics-text');
  const lyricsContainer = document.getElementById('lyrics-container');

  // Functions
  function loadTrack(index) {
    const track = PLAYLIST[index];
    coverArt.src = track.coverArt;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audio.src = track.src;
    lyricsText.textContent = track.lyrics;
    lyricsContainer.scrollTop = 0;
    updatePlaylistUI();
    
    // Reset progress bar for new track
    progressBar.value = 0;
    progressBar.style.background = `linear-gradient(to right, #6366f1 0%, #475569 0%)`;
    currentTimeEl.textContent = '00:00';
    
    if (isPlaying) {
      audio.play().catch(e => console.error("Error playing audio:", e));
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateProgress() {
    const { duration, currentTime } = audio;
    if (duration) {
      const progressPercentage = (currentTime / duration) * 100;
      progressBar.value = currentTime;
      progressBar.style.background = `linear-gradient(to right, #6366f1 ${progressPercentage}%, #475569 ${progressPercentage}%)`;
      currentTimeEl.textContent = formatTime(currentTime);
    }
  }
  
  function renderPlaylist() {
    playlistList.innerHTML = '';
    PLAYLIST.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = 'playlist-item';
      li.dataset.index = index;

      const isCurrent = index === currentTrackIndex;
      if (isCurrent) {
        li.classList.add('active');
      }

      li.innerHTML = `
        <div class="playlist-item-info-container">
          <span class="playlist-item-index">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <p class="playlist-item-title">${track.title}</p>
            <p class="playlist-item-artist">${track.artist}</p>
          </div>
        </div>
        ${isCurrent && isPlaying ? `
          <div class="music-wave-icon">
            <span class="music-wave-bar" style="animation-delay: 0.1s"></span>
            <span class="music-wave-bar" style="animation-delay: 0.2s"></span>
            <span class="music-wave-bar" style="animation-delay: 0.3s"></span>
            <span class="music-wave-bar" style="animation-delay: 0.4s"></span>
          </div>
        ` : ''}
      `;
      li.addEventListener('click', () => {
        currentTrackIndex = index;
        isPlaying = true;
        loadTrack(index);
        updatePlayPauseButton();
      });
      playlistList.appendChild(li);
    });
  }

  function updatePlaylistUI() {
    renderPlaylist();
    const activeItem = playlistList.querySelector('.active');
    if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function updatePlayPauseButton() {
    if (isPlaying) {
      playPauseBtn.classList.add('playing');
      playPauseBtn.setAttribute('aria-label', 'Pause');
    } else {
      playPauseBtn.classList.remove('playing');
      playPauseBtn.setAttribute('aria-label', 'Play');
    }
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audio.play().catch(e => console.error("Error playing audio:", e));
    } else {
      audio.pause();
    }
    updatePlayPauseButton();
    updatePlaylistUI();
  }

  function goToNextTrack() {
    if (isShuffle) {
      let nextIndex;
      if (PLAYLIST.length <= 1) {
        nextIndex = 0;
      } else {
        do {
          nextIndex = Math.floor(Math.random() * PLAYLIST.length);
        } while (nextIndex === currentTrackIndex);
      }
      currentTrackIndex = nextIndex;
    } else {
      currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    }
    loadTrack(currentTrackIndex);
  }

  function goToPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(currentTrackIndex);
  }

  function handleTrackEnd() {
    if (repeatMode === 'one') {
      audio.currentTime = 0;
      audio.play();
      return;
    }
    const isLastTrack = currentTrackIndex === PLAYLIST.length - 1;
    if (repeatMode === 'playlist' || (repeatMode === 'off' && !isLastTrack && !isShuffle) || isShuffle) {
      goToNextTrack();
    } else {
      isPlaying = false;
      updatePlayPauseButton();
      updatePlaylistUI();
    }
  }

  // Event Listeners
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', goToNextTrack);
  prevBtn.addEventListener('click', goToPrevTrack);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', handleTrackEnd);
  
  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
  });

  progressBar.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
    updateProgress();
  });

  volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    audio.volume = volume;
    volumeSlider.style.background = `linear-gradient(to right, #a5b4fc ${volume * 100}%, #475569 ${volume * 100}%)`;
  });
  
  shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
  });
  
  repeatBtn.addEventListener('click', () => {
    if (repeatMode === 'off') {
      repeatMode = 'playlist';
      repeatBtn.classList.add('active');
    } else if (repeatMode === 'playlist') {
      repeatMode = 'one';
    } else {
      repeatMode = 'off';
      repeatBtn.classList.remove('active');
    }
    repeatBtn.className = 'icon-button'; // Reset classes
    if (repeatMode !== 'off') repeatBtn.classList.add('active');
    repeatBtn.classList.add(repeatMode); // 'off', 'one', or 'playlist'
  });

  // Initial Load
  loadTrack(currentTrackIndex);
  volumeSlider.dispatchEvent(new Event('input')); // Set initial volume gradient
});
