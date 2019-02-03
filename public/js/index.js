var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text:'Hey. This is Katerina!'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

//listening to a custom event from server to client
// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

socket.on('newUser', function(message){
    console.log('New message', message) 
});

socket.on('newMessage', function(message){
    console.log('New message', message) 
});