const http = require('http');
const express = require('express');
const socket = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = 5050;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));

io.on('connection', socket => {

    socket.on('welcome', (username) => {
        socket.emit('chat', { username: 'System', message: `Witaj ${username}.
Za chwilę konsultant dołączy do rozmowy.` });
    })

    socket.on('welcomeUser', username => {
        socket.emit('chatAdmin', { username: username, message: `Użytkownik ${username} czeka na ciebie.` })
    });

    socket.on('welcomeAdmin', username => {
        socket.emit('welcomeAdmin', `Konsultant z [${username}] dołączył do rozmowy.`)
    })

    socket.on('chat', ({ username, message }) => {
        socket.broadcast.emit('chat', { username: `${username} ${moment().format('LT')}`, message: message });
    })

    socket.on('add', (username) => {
        socket.broadcast.emit('chat', `${username} dołączył do czatu`);
    })

    socket.on('typing', (username) => {
        socket.broadcast.emit('chat', `${username} pisze ...`);
    })

    socket.on('diconnect', (username) => {
        io.emit('message', `${username} opuścił czat`)
    })
})

//-----------------------   created by Andrzej Kot - https://github.com/RederAc3   -----------------------//