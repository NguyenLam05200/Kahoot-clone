import { Howl, Howler } from 'howler';

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
        volume: 0.3,
    })
}

let playList = [];
playList.push(
    newSound(startGameSound),
    newSound(showResultSound),
    newSound(readQuestionSound),
    newSound(scoreBoardSound),
    newSound(chooseAnswerSound),
    newSound(sumarySound),
)


const changeVolume = (vol) => {
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
    for (const [i, eachSound] of playList.entries()) {
        if (i === index) {
            eachSound.stop();
            eachSound.play();
        } else {
            eachSound.stop();
        }
    }
    // playList.map((eachSound, i) => {
    //     if (i === index) {
    //         eachSound.stop();
    //         eachSound.play();
    //     } else {
    //         eachSound.stop();
    //     }
    // })
}

export { playSound, changeVolume }