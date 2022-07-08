import { Howl, Howler } from 'howler';

import soundTest from './test.wav'
import startGameSound from './startGameSound.mp3'
import showResultSound from './showResultSound.mp3'
import scoreBoardSound from './scoreBoardSound.mp3'
import chooseAnswerSound from './chooseAnswerSound.mp3'
import readQuestionSound from './readQuestionSound.mp3'
import sumarySound from './sumarySound.mp3'
const newSound = (src) => {
    return new Howl({
        src: [src],
        html5: true,
        volume: 0.5,
    })
}

let playList = [];
playList.push(
    newSound(startGameSound),
    newSound(showResultSound),
    newSound(scoreBoardSound),
    newSound(chooseAnswerSound),
    newSound(readQuestionSound),
    newSound(sumarySound),
)

// const playSound = (src, isAutoPlay) => {
//     const sound = new Howl({
//         src: src,
//         html5: true,
//         autoplay: isAutoPlay,
//         volume: 0.5,
//     })
//     sound.play();
// }

const changeVolumn = (vol) => {
    // Change global volume in range : [0, 1]
    // Howler.volume(0.5);
    Howler.volume(vol);
}

/**
     * index = 0: startGame
     * index = 1: showResult
     * index = 2: scoreBoard
     * index = 3: chooseAnswer
     * index = 4: readQuestionSound
     * index = 5: sumarySound
     */
const playSound = (index) => {
    // playList[index].play();
    playList.map((eachSound, i) => {
        if (i === index) {
            eachSound.stop();
            eachSound.play();
        } else {
            eachSound.stop();
        }
    })
}

const stopSound = (index) => {
    playList[index].stop();
}

export { playSound, stopSound, changeVolumn }