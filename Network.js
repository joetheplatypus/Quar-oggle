module.exports = {
    connections: [],
    addConnection(socket) {
        this.connections.push(socket)
    },
    broadcast(message, data) {
        this.connections.map(socket => {
            socket.emit(message, data)
        })
    },
    send(socketId, message, data) {
        const socket = this.fromID(socketId);
        socket.emit(message, data);
    },
    fromID(id) {
        return this.connections.find(con => con.id === id)
    },
}