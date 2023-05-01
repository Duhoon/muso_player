/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const AudioContext = window.AudioContext || window.webkitAudioContext;\nconst audioContext = new AudioContext();\n\nconst audioElement = document.querySelector(\"audio\");\n\nconst track = audioContext.createMediaElementSource(audioElement);\ntrack.connect(audioContext.destination);\n\n(function(){\n   fetch(\"../music.mp3\")\n    .then( response => response.arrayBuffer() )\n    .then( arraybuffer => {\n        audioContext.decodeAudioData(arraybuffer, buffer => {\n            currentBuffer = buffer;\n            displayBuffer(buffer);\n        })\n    } )\n})()\n\n// CANVAS\nlet canvas = document.querySelector('canvas');\nlet context = canvas.getContext('2d');\nconst canvasWidth = 500, canvasHeight = 200;\n\n\nasync function displayBuffer(buff){\n    const drawLines = 600;\n    let leftChannel = buff.getChannelData(0);\n    console.log(leftChannel);\n    let lineOpacity = canvasWidth / leftChannel.length ;\n    context.save();\n    // context.fillStyle = \"#000\";\n    // context.fillRect(0, 0, canvasWidth, canvasHeight);\n    context.strokeStyle = '#cbcbcb';\n    context.globalCompositeOperation = 'color';\n    context.translate(0, canvasHeight / 2.6);\n    context.globalAlpha = 0.06 ;\n    context.lineWidth=1;\n\n    const totalLength = leftChannel.length;\n    const eachBlock = Math.floor(totalLength / drawLines);\n    const lineGap = (canvasWidth/drawLines);\n\n    context.beginPath();\n    for ( let i = 0 ; i < drawLines; i++){\n        var audioBuffKey = Math.floor(eachBlock * i);\n        var x = i * lineGap;\n        var y = leftChannel[audioBuffKey] * canvasHeight / 4 ;\n        context.moveTo(x, y / 2);\n        context.lineTo(x, -y / 2);\n        context.stroke();\n    }\n    context.restore();\n    console.log(\"done\");\n    console.log(leftChannel.length);\n}\n\n\n// INTERACE\n\nconst buttons = document.querySelectorAll(\"button\");\nconst beforeBtn = buttons[0];\nconst playBtn = buttons[1];\nconst stopBtn = buttons[2];\n\n\nconst playtime = document.querySelector(\".playtime\");\nconst playtimeSet = {\n    minutes : \"00\",\n    seconds : \"00\",\n    milliseconds : \"00\"\n}\nlet playtimeInterval;\nconst cursortime = document.querySelector(\".cursortime\");\n\nplayBtn.addEventListener('click', function(){\n    if(audioContext.state === 'suspended'){\n        audioContext.resume();\n    }\n\n    let target = this.childNodes[1].classList\n\n    if(this.dataset.playing === 'false'){\n        // Modify Icon \n        audioElement.play();\n        this.dataset.playing = 'true';\n        target.remove(\"fa-play\");\n        target.add(\"fa-pause\")\n\n        const [currentMinutesView, currentSecondsView, currentMillisecondsView] = playtime.children;\n        \n        // Change playtime \n        playtimeInterval = function(){return setInterval(()=>{\n            const currentTime = new Date(audioElement.currentTime * 1000);\n\n            const currentMinutes = currentTime.getMinutes();\n            const currentSeconds = currentTime.getSeconds();\n            const currentMilliseconds = Math.floor(currentTime.getMilliseconds() / 10);\n\n            currentMinutesView.textContent = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes ;\n            currentSecondsView.textContent = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds ;\n            currentMillisecondsView.textContent = currentMilliseconds < 10 ? '0' + currentMilliseconds : currentMilliseconds ;\n        }, 10)}();\n        \n    } else if (this.dataset.playing === 'true'){\n        audioElement.pause();\n        this.dataset.playing = 'false';\n        target.remove(\"fa-pause\");\n        target.add(\"fa-play\");\n\n        clearInterval(playtimeInterval);\n    }\n}, false);\n\nstopBtn.addEventListener('click', function(){\n    const [currentMinutesView, currentSecondsView, currentMillisecondsView] = playtime.children;\n\n    if(playBtn.dataset.playing === 'true'){\n        playBtn.dataset.playing = 'false';\n        icon = playBtn.childNodes[1].classList;\n        icon.remove(\"fa-pause\");\n        icon.add(\"fa-play\");\n    }\n\n    clearInterval(playtimeInterval);\n    audioElement.pause();\n    audioElement.currentTime = 0;\n    audioContext.currentTime = 0;\n\n    currentMinutesView.textContent = '00' ;\n    currentSecondsView.textContent = '00' ;\n    currentMillisecondsView.textContent = '00' ;\n})\n\n//# sourceURL=webpack://webaudioapi/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;