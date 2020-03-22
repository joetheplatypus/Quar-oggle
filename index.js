const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const settings = require('./settings.js');
const Network = require('./Network.js');
const Game = require('./Game.js')


app.use(express.static('client'));
server.listen(settings.port);
console.log('server started.');

io.on('connection',(socket) => {
    Network.addConnection(socket)

    socket.on('new-round', () => {
        Game.start();
    })

    socket.on('scoreboard-update', (text) => {
        Game.setScoreboard(text);
    })
})

function tick() {
    Game.tick();
    Network.broadcast('update', Game.state);
}

setInterval(tick, 1000)

