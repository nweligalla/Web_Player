const musicContainer = document.querySelector('.music-container');
const imgContainer = document.querySelector('.img-container');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const file = document.querySelector('#choose-file');
const songDuration = document.querySelector('#duration-time');
const playTime = document.querySelector('#play-time');
// const musicDot = window.getComputedStyle(imgContainer,':after')

const nextPlayingContainer = document.querySelector('.next-playing-container');
const nextPlayingSong = document.querySelector('#next-playing-song');

const webTitle = document.querySelector('title');
const body = document.querySelector('body');




let currentSong = 0;
let songList = [];
const reader = new FileReader();
const colors = [
    'rgb(232, 221, 221)',
    'rgb(272, 151, 181)',
    'rgb(102, 151, 181)',
    'rgb(102, 151, 281)',
    'rgb(92, 51, 81)',
    'rgb(92, 151, 81)',
    'rgb(192, 101, 81)',
    'rgb(12, 191, 181)',
    'rgb(122, 131, 11)',
    'rgb(162, 121, 110)'
];

//change theme color
const changeColorTheme = () => {
    let rand = Math.floor(Math.random() * 10);
    console.log(rand)
    body.style.backgroundImage = `linear-gradient(0deg,rgb(255, 254, 254) 23.8%, ${colors[rand]} 92%)`;
    musicContainer.style.boxShadow = `0 20px 20px 0 ${colors[rand]}`;
    nextPlayingContainer.style.boxShadow = `0 20px 20px 0 ${colors[rand]}`;


}

//play selected song
const playSong = () => {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    webTitle.innerText = `Web_Player | ${songList[currentSong].name}`;
    audio.play();
}

//pause the playing song
const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');
    audio.pause();
    webTitle.innerText = `Web_Player`;

}

//play the next song
const nextSong = () => {
    currentSong++;
    if (currentSong > songList.length - 1) {
        currentSong = 0;
    }
    loadSong(songList[currentSong]);

}

//load the song
const loadSong = (song) => {
    reader.readAsDataURL(song);
    if (songList.length > 1) {
        nextPlayingContainer.style.display = 'block';
        nextPlayingSong.innerText = currentSong === songList.length - 1 ? songList[0].name : songList[currentSong + 1].name;
    } else {
        nextPlayingContainer.style.display = 'hidden';
    }
    reader.onload = () => {
        audio.src = reader.result;
        title.innerText = song.name;
        playSong();
        changeColorTheme();
    }

}


// *** control button functions ***

//play & pause
playBtn.addEventListener('click', () => {
    if (audio.src === "") {
        cover.style.border = "2px solid pink";
        setTimeout(() => cover.style.border = "none", 1000);
    } else {
        const isPlaying = musicContainer.classList.contains('play');
        isPlaying ? pauseSong() : playSong();
    }

});

//play previous song
prevBtn.addEventListener('click', () => {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);


});

//play next song
nextBtn.addEventListener('click', nextSong);

//progress bar and timer
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    songDuration.innerText = (duration / 60).toFixed(2);
    playTime.innerText = (currentTime / 60).toFixed(2);
});

progressContainer.addEventListener('click', function (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;

});

//play next song after the current playing song ended
audio.addEventListener('ended', nextSong);


//select audio file from browser and play the first song
file.addEventListener('change', (e) => {
    songList = file.files;
    loadSong(songList[0]);
});