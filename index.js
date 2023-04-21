const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");

const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

const playBtn = document.querySelector("button");
playBtn.addEventListener('click', function(){
    if(audioContext.state === 'suspended'){
        audioContext.resume();
    }

    let target = this.childNodes[1].classList

    if(this.dataset.playing === 'false'){
        audioElement.play();
        this.dataset.playing = 'true';
        target.remove("fa-play");
        target.add("fa-pause")
        
    } else if (this.dataset.playing === 'true'){
        audioElement.pause();
        this.dataset.playing = 'false';
        target.remove("fa-pause");
        target.add("fa-play")
    }
}, false);

const pauseBtn = document.createElement("div");
const stopBtn = document.createElement("div");



