const settings = require('./settings.js')

const DICE = [
    'AACIOT'.split(''),
    'ABILTY'.split(''),
    'ABJMO'.split(''),
    'ACDEMP'.split(''),
    'ACELRS'.split(''),
    'ADENVZ'.split(''),
    'AHMORS'.split(''),
    'BIFORX'.split(''),
    'DENOSW'.split(''),
    'DKNOTU'.split(''),
    'EEFHIY'.split(''),
    'EGKLUY'.split(''),
    'EGINTV'.split(''),
    'EHINPS'.split(''),
    'ELPSTU'.split(''),
    'GILRUW'.split(''),
]
DICE[2].push('Qu')

module.exports = {
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
            const rand = Math.floor(Math.random() * 6);
            this.state.letters.push(DICE[i][rand])
        }
    },
    setScoreboard(text) {
        this.state.scoreboard = text;
    },
}