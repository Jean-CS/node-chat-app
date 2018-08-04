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

$('#form-message').on('submit', function (e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: $(this).find('[name=message]').val()
  }, function () {

  })
})