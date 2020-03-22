const settings = require('./settings.js')

const CHARACTERS = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split('')
CHARACTERS.push('Qu');

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
            const rand = Math.floor(Math.random()*26);
            const letter = this.CHARACTERS[rand];
            this.state.letters.push(letter);
        }
    },
    setScoreboard(text) {
        this.state.scoreboard = text;
    }
}