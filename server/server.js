const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//this is to serve up the pages in the public folder
app.use(express.static(publicPath));

//lets you register an event listener
//lets you listen to a new connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // emits to every connection
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newUser', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });
    

    //socket.emit emits to just one connection
    //name of the event you want to emit
    //data should be specified as its the data that should go
    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'hey what is going on',
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('create message', message);
        io.emit('newMessage', {
            from:message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        //broadcase to specific user except me
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    //listener
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
