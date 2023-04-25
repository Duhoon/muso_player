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
const canvasWidth = 500, canvasHeight = 200;


async function displayBuffer(buff){
    const drawLines = 600;
    let leftChannel = buff.getChannelData(0);
    console.log(leftChannel);
    let lineOpacity = canvasWidth / leftChannel.length ;
    context.save();
    // context.fillStyle = "#000";
    // context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = '#cbcbcb';
    context.globalCompositeOperation = 'color';
    context.translate(0, canvasHeight / 2.6);
    context.globalAlpha = 0.06 ;
    context.lineWidth=1;

    const totalLength = leftChannel.length;
    const eachBlock = Math.floor(totalLength / drawLines);
    const lineGap = (canvasWidth/drawLines);

    context.beginPath();
    for ( let i = 0 ; i < drawLines; i++){
        var audioBuffKey = Math.floor(eachBlock * i);
        var x = i * lineGap;
        var y = leftChannel[audioBuffKey] * canvasHeight / 4 ;
        context.moveTo(x, y / 2);
        context.lineTo(x, -y / 2);
        context.stroke();
    }
    context.restore();
    console.log("done");
}

const buttons = document.querySelectorAll("button");
const playBtn = buttons[0];
const stopBtn = buttons[1];
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
        target.add("fa-play");
    }
}, false);

stopBtn.addEventListener('click', function(){
    if(playBtn.dataset.playing === 'true'){
        playBtn.dataset.playing = 'false';
        icon = playBtn.childNodes[1].classList;
        icon.remove("fa-pause");
        icon.add("fa-play");
    }

    audioElement.pause();
    audioElement.currentTime = 0;
})