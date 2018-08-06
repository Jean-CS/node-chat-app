// creates the connection and store it in 'socket' variable
const socket = io()

function scrollToBottom() {
  const messages = $('#messages')
  const newMessage = messages.children('li:last-child')

  const clientHeight = messages.prop('clientHeight')
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight')
  const newMessageHeight = newMessage.innerHeight()
  const lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    // console.log('Should scroll');

    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', () => {
  const params = $.deparam(window.location.search)

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error');
    }
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('updateUserList', function (users) {
  const ol = $('<ol></ol>');

  users.forEach(function (user) { 
    ol.append($('<li></li>').text(user))
  })

  $('#users').html(ol);
})

socket.on('newMessage', (data) => {
  const formattedTime = moment(data.createdAt).format('h:mm a')

  const template = $('#message-template').html()
  const html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')

  const template = $('#location-message-template').html()
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()
})

$('#form-message').on('submit', function (e) {
  e.preventDefault()
  const messageElement = $(this).find('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageElement.val()
  }, function () {
    messageElement.val('').focus()
  })
})

const locationButton = $('#send-location');

locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  $(this).attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })

    locationButton.removeAttr('disabled').text('Send location')
  }, function () {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location')
  })
})