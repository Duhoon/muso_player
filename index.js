const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");

const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

(function(){
   fetch("music.mp3")
    .then( response => response.arrayBuffer() )
    .then( arraybuffer => {
        audioContext.decodeAudioData(arraybuffer, buffer => {
            currentBuffer = buffer;
            displayBuffer(buffer);
        })
    } )
})()

// CANVAS
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
const canvasWidth = 500, canvasHeight = 300;


async function displayBuffer(buff){
    let leftChannel = buff.getChannelData(0);
    let lineOpacity = canvasWidth / leftChannel.length ;
    context.save();
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = "#121";
    context.globalCompositeOperation = 'lighter';
    context.translate(0, canvasHeight / 2);
    context.globalAlpha = 0.06 ;
    for ( let i = 0 ; i < leftChannel.length; i++){
        var x = Math.floor( canvasWidth * i / leftChannel.length );
        var y = leftChannel[i] * canvasHeight / 2 ;
        context.beginPath();
        context.moveTo( x, 0);
        context.lineTo(x+1, y);
        context.stroke();
    }
    context.restore();
    console.log("done");
}

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



