var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');

    //selector specific to children of "messages"
    var newMessage = messages.children('li:last-child');
    
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    // console.log('Connected to server');

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err){
        if (err){
            alert(err);
            //redirected back to the homepage
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });

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
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`); 

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    
    //Mustache allows to easily include data in HTML
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank"> My current location</a>');

    // li.text(`${message.from} ${formattedTime}: `);

    // //attr is a jQuery method that allows you to manipulate attributes
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
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