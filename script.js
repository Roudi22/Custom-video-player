const container = document.querySelector(".container");
const mainVideo = document.querySelector("video");
const progressBar = document.querySelector(".progress-bar");
const playPauseBtn = document.querySelector(".play-pause i");
const skipForward = document.querySelector(".skip-forward");
const skipBackward = document.querySelector(".skip-backward");
const volumeBtn = document.querySelector(".volume i")
const volumeSlider = document.querySelector("input")

mainVideo.addEventListener("timeupdate", (e)=>{
    let { currentTime, duration } = e.target
    let percent = ( currentTime / duration) * 100
    progressBar.style.width = `${percent}%`
})

volumeBtn.addEventListener("click", ()=> {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high")
    } else {
        mainVideo.volume = 0.0
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark")
    }
})

volumeSlider.addEventListener("input", (e)=> {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark")
    } else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high")
    }
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