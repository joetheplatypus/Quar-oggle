const canvas = document.getElementById('canvas');
const clock = document.getElementById('timer');
const btn_newround = document.getElementById('new_round');
const scoreboard = document.getElementById('scoreboard-text');
const socket = io();

socket.on('update', (data) => {
    console.log(data)
    updateGrid(data.letters);
    updateClock(data.timer);
    updateScoreboard(data.scoreboard)
})

function updateGrid(letters) {
    for(let i = 0; i < 16; i++) {
        const dom = document.getElementById('grid' + (i+1));
        dom.innerText = letters[i]
    }
}

function updateClock(timer) {
    const minutes = Math.floor(timer/60);
    let seconds = (timer % 60);
    if(seconds < 10) {
        seconds = "0" + seconds
    }
    clock.innerText = minutes + ':' + seconds;

    if(timer === 0) {
        clock.classList.add('flash')
    } else {
        clock.classList.remove('flash')
    }
}

function updateScoreboard(text) {
    scoreboard.value = text
}   

btn_newround.onclick = () => {
    socket.emit('new-round', {})
}

scoreboard.oninput = () => {
    socket.emit('scoreboard-update', scoreboard.value)
}

