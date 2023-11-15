const masterPlay = document.getElementById('master-play');
const progressBar = document.getElementById('progress-bar');
const playingGif = document.querySelector('.playing-gif');
const songItems = Array.from(document.querySelectorAll('.song-item'));
const playBtns = document.querySelectorAll('.play');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const masterSongName = document.getElementById('master-song-name');

const audio = new Audio('./songs/1.mp3');
let songIndex = 0;

let isDragging = false;

const songs = [
    { name: 'Warriyo - Mortals', filePath: './songs/1.mp3', coverPath: './covers/1.jpg' },
    { name: 'DEAF KEV - Invincible', filePath: './songs/3.mp3', coverPath: './covers/3.jpg' },
    { name: 'Cielo', filePath: './songs/2.mp3', coverPath: './covers/2.jpg' },
    { name: 'My Heart', filePath: './songs/4.mp3', coverPath: './covers/4.jpg' },
    { name: 'Janji-Heroes-Tonight', filePath: './songs/5.mp3', coverPath: './covers/5.jpg' },
    { name: 'Let me down slowly', filePath: './songs/6.mp3', coverPath: './covers/6.jpg' },
];

songItems.forEach((item, i) => {
    item.querySelector('img').src = songs[i].coverPath;
    item.querySelector('.song-name').innerHTML = songs[i].name;

    // The duration property of the Audio object is NaN until the audio has been loaded and the metadata, including duration, has been retrieved.
    // To get the duration of each audio file, you need to wait for the audio to load and then access its duration property. You can use the 'loadedmetadata' event for this purpose.
    const audio = new Audio(`${songs[i].filePath}`);
    audio.addEventListener('loadedmetadata', () => {
        item.querySelector('.song-duration').innerHTML = (audio.duration / 60).toFixed(2);
    })
})

masterPlay.addEventListener('click', (e) => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        playingGif.style.opacity = 1;
    } else {
        audio.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        playingGif.style.opacity = 0;
    }
});


// The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
audio.addEventListener('timeupdate', (e) => {
    if (!isDragging) {
        const progressPercentage = parseFloat((audio.currentTime / audio.duration) * 100);
        progressBar.value = progressPercentage;
    }
    // console.log(audio.currentTime,audio.currentSrc, audio.src, audio.duration, audio.paused, audio.muted, audio.volume);
});

progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value * audio.duration / 100;
});

// for smooth transition of song when mouse is dragged in progrssBar

progressBar.addEventListener('mousedown', () => {
    isDragging = true;
});

progressBar.addEventListener('mouseup', () => {
    isDragging = false;
});

progressBar.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const percentage = (e.offsetX / progressBar.clientWidth) * 100;
        progressBar.value = percentage;
        audio.currentTime = percentage * audio.duration / 100;
    }
});

const changeAllButtonToPlayIcon = () => {
    document.querySelectorAll('.play').forEach(btn => {
        btn.classList.remove('fa-pause');
        btn.classList.add('fa-play');
    })
}

// when play button is clicked for individual songs
playBtns.forEach(btn => {
    let x;
    btn.addEventListener('click', (event) => {

        if (btn.classList.contains('fa-play')) {
            if (x === undefined) {
                changeAllButtonToPlayIcon();
                songIndex = parseInt(event.target.id);
                masterSongName.innerText = songs[songIndex].name;
                audio.src = `./songs/${songIndex + 1}.mp3`;
            } else {
                // console.log(x);
                progressBar.value = x;
            }

            btn.classList.remove('fa-play')
            btn.classList.add('fa-pause');
            audio.play();
            playingGif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        } else {
            btn.classList.remove('fa-pause');
            btn.classList.add('fa-play');
            audio.pause();
            playingGif.style.opacity = 0;

            // when the song is being paused, save the currentTime so that we can resume it from here when the song is played again
            x = audio.currentTime;

            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }
    })
})

// previous button
previousBtn.addEventListener('click', (e) => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    masterSongName.innerText = songs[songIndex].name;
    audio.src = `./songs/${songIndex + 1}.mp3`;

    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

// next button
nextBtn.addEventListener('click', (e) => {
    if (songIndex >= 5) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    masterSongName.innerText = songs[songIndex].name;
    audio.src = `./songs/${songIndex + 1}.mp3`;

    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})