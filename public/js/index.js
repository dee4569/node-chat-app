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

// socket.on('newUser', function(message){
//     console.log('New message', message) 
// });

socket.on('newMessage', function(message){
    console.log('New message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`); 

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> My current location</a>');

    li.text(`${message.from}: `);

    //attr is a jQuery method that allows you to manipulate attributes
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
    //prevents the default behaviour for the submit event
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {

    //geolocation is in navigator
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location');
    });
});