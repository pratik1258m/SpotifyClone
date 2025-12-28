console.log("Welcome To Spotify")
let songIndex = 0;
let audioElement = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Heartbroken Instrumental 1", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", coverPath: "https://picsum.photos/id/11/50/50" },
    { songName: "Romantic Melody 1", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", coverPath: "https://picsum.photos/id/12/50/50" },
    { songName: "High Energy Masti 1", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", coverPath: "https://picsum.photos/id/13/50/50" },
    { songName: "Serious Vibes 1", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", coverPath: "https://picsum.photos/id/14/50/50" },
    { songName: "Motivated Beats 1", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", coverPath: "https://picsum.photos/id/15/50/50" },
    { songName: "Heartbroken Instrumental 2", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", coverPath: "https://picsum.photos/id/16/50/50" },
    { songName: "Romantic Melody 2", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", coverPath: "https://picsum.photos/id/17/50/50" },
    { songName: "High Energy Masti 2", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", coverPath: "https://picsum.photos/id/18/50/50" },
    { songName: "Serious Vibes 2", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", coverPath: "https://picsum.photos/id/19/50/50" },
    { songName: "Motivated Beats 2", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", coverPath: "https://picsum.photos/id/21/50/50" },
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        updateSongListPlayStatus(songIndex, true);
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        updateSongListPlayStatus(songIndex, false);
    }
})
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);
    if (currentSeconds < 10) { currentSeconds = `0${currentSeconds}`; }
    if (document.getElementById('currentStart')) document.getElementById('currentStart').innerText = `${currentMinutes}:${currentSeconds}`;
    if (audioElement.duration) {
        let durationMinutes = Math.floor(audioElement.duration / 60);
        let durationSeconds = Math.floor(audioElement.duration % 60);
        if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`; }
        if (document.getElementById('currentEnd')) document.getElementById('currentEnd').innerText = `${durationMinutes}:${durationSeconds}`;
    }
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
const updateSongListPlayStatus = (index, isPlaying) => {
    makeAllPlays();
    const activeItem = document.getElementById(index);
    if (activeItem) {
        if (isPlaying) {
            activeItem.classList.remove('fa-circle-play');
            activeItem.classList.add('fa-circle-pause');
        } else {
            activeItem.classList.add('fa-circle-play');
            activeItem.classList.remove('fa-circle-pause');
        }
    }
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.querySelector(".songInfo img").src = songs[songIndex].coverPath;
        document.querySelector(".songInfo img").classList.add("playing");
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateSongListPlayStatus(songIndex, true);
    document.querySelector(".songInfo img").src = songs[songIndex].coverPath;
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateSongListPlayStatus(songIndex, true);
    document.querySelector(".songInfo img").src = songs[songIndex].coverPath;
})

