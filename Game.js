const settings = require('./settings.js')

const CHARACTERS = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split('')
CHARACTERS.push('Qu');
const CHARACTER_PROBS_PERCENT = [8.55, 1.60, 3.16, 3.87, 12.10, 2.18, 2.09, 4.96, 7.33, 0.22, 0.81, 4.21, 2.53, 7.17, 7.47, 2.07, 6.33, 6.73, 8.94, 2.68, 1.06, 1.83, 0.19, 1.72, 0.11, 0.10]
const CHARACTER_PROBS = CHARACTER_PROBS_PERCENT.map(val => val/100);

module.exports = {
    CHARACTERS: CHARACTERS,
    EMPTY: ['','','','','','','','','','','','','','','',''],
    countdown: false,
    state: {
        timer: 0,
        letters: ['','','','','','','','','','','','','','','',''],
        scoreboard: '',
    },
    start() {
        this.state.timer = settings.countdownTimer+1
        this.state.letters = this.EMPTY;
        this.countdown = true;
    },
    tick() {
        if(this.state.timer > 1) {
            this.state.timer--;
        } else {
            if(this.countdown) {
                this.newLetters();
                this.state.timer = settings.timer;
                this.countdown = false;
            } else {
                //end of round
                if(this.state.timer == 1) {
                    this.state.timer = 0;
                }
            }
        }
    },
    newLetters() {
        this.state.letters = [];
        for(let i = 0; i < 16; i++) {
            const letter = chooseRandomLetter();
            this.state.letters.push(letter);
        }
    },
    setScoreboard(text) {
        this.state.scoreboard = text;
    },
    chooseRandomLetter() {
        let r = Math.random();
        let acc = 0;
        let index = 0
        while(acc < r) {
            acc += CHARACTER_PROBS[index]
            index++;
        }
        return CHARACTERS[index]
    }
}