const container = document.querySelector(".container");
const mainVideo = document.querySelector("video");
const progressBar = document.querySelector(".progress-bar");
const playPauseBtn = document.querySelector(".play-pause i");
const skipForward = document.querySelector(".skip-forward");
const skipBackward = document.querySelector(".skip-backward");
const volumeBtn = document.querySelector(".volume i");
const volumeSlider = document.querySelector("input");
const speedBtn = document.querySelector(".playback-speed span");
const speedOptions = document.querySelector(".speed-options");
const picInPicBtn = document.querySelector(".pic-in-pic span");
const fullscreenBtn = document.querySelector(".fullscreen i");
const videoTimeline = document.querySelector(".video-timeline");
const currentVidTime = document.querySelector(".current-time");
const videoDuration = document.querySelector(".video-duration");

let timer;

const hideControls = ()=> {
    if(mainVideo.paused) return;
    timer = setTimeout(()=> {
        container.classList.remove("show-controls");
    }, 3000)
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
})

const formatTime = (time)=> {
    // getting seconds, minutes, hours
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60
    let hours = Math.floor(time / 3600);


    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }

    return `${hours}:${minutes}:${seconds}`;
}

mainVideo.addEventListener("timeupdate", (e)=>{
    let { currentTime, duration } = e.target
    let percent = ( currentTime / duration) * 100
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
})

mainVideo.addEventListener("loadeddata", (e)=> {
    videoDuration.innerText = formatTime(e.target.duration)
})

const draggableProgressBar = (e)=> {
    let timelineWidth = videoTimeline.clientWidth; // getting videoTimeline width
    progressBar.style.width = `${e.offsetX}px`
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; // updating video currentTime
    currentVidTime.innerText = formatTime(mainVideo.currentTime)
}

videoTimeline.addEventListener("mousedown", ()=> {
    videoTimeline.addEventListener("mousemove", draggableProgressBar)
})

container.addEventListener("mouseup", ()=> {
    videoTimeline.removeEventListener("mousemove", draggableProgressBar)
})

videoTimeline.addEventListener("mousemove", e => {
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`
    let timelineWidth = videoTimeline.clientWidth; // getting videoTimeline width
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent)
})

videoTimeline.addEventListener("click", e => {
    let timelineWidth = e.target.clientWidth; // getting videoTimeline width
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; // updating video currentTime
})


volumeBtn.addEventListener("click", ()=> {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high")
    } else {
        mainVideo.volume = 0.0
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark")
    }
    volumeSlider.value = mainVideo.volume
})

volumeSlider.addEventListener("input", (e)=> {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark")
    } else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high")
    }
})

speedBtn.addEventListener("click", ()=> {
    speedOptions.classList.toggle("show")
})

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", ()=> {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    })
})

document.addEventListener("click", (e)=> {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show")
    }
})

picInPicBtn.addEventListener("click", ()=> {
    mainVideo.requestPictureInPicture();
})

fullscreenBtn.addEventListener("click", ()=> {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullscreenBtn.classList.replace("fa-compress", "fa-expand")
        return document.exitFullscreen();
    }
    fullscreenBtn.classList.replace("fa-expand", "fa-compress")
    container.requestFullscreen();
})

skipBackward.addEventListener("click", ()=>{
    mainVideo.currentTime -= 5
})
skipForward.addEventListener("click", ()=>{
    mainVideo.currentTime += 5
})
playPauseBtn.addEventListener("click", ()=> {
    // if video is paused, play the video else pause the video
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
})

mainVideo.addEventListener("play", ()=> {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", ()=> {
    playPauseBtn.classList.replace("fa-pause", "fa-play")
})