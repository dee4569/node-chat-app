const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
 
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
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
    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required');
        }

        //special place for people to talk in the same room
        socket.join(params.room);

        //io.to('Theoffice fans').emit is a method that takes the room name; that allows to send a message to everone
        //who is connected to the room

        //Different method names
        //io.emit - send to every single connected user
        //socket.broadcast.emit - send to everyone except for the current user
        //socket.emit - specifically to just one user

        // emits to every connection
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
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

    socket.on('createMessage', (message, callback) => {
        //console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
       
       //acknolwedges that the data was got from the server
        callback();
        //broadcase to specific user except me
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    //listener
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
