// creates the connection and store it in 'socket' variable
const socket = io()

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('New message', data)
  const li = $('<li></li>');
  li.text(`${data.from}: ${data.text}`)

  $('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  const li = $('<li></li>')
  const a = $('<a target="_blank">My current location</a>')

  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a)
  $('#messages').append(li)
})

$('#form-message').on('submit', function (e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: $(this).find('[name=message]').val()
  }, function () {

  })
})

const locationButton = $('#send-location');

locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location.');
  })
})