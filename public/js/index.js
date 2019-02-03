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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`); 

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);

    //attr is a jQuery method that allows you to manipulate attributes
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
    //prevents the default behaviour for the submit event
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {

    //geolocation is in navigator
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    //disable button while the location is being fetched
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        //reenable the button
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});