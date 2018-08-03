// creates the connection and store it in 'socket' variable
const socket = io()

socket.on('connect', () => {
  console.log('Connected to server')

  // fires an event to the server
  socket.emit('createMessage', {
    to: 'someone@example.com',
    text: 'Whatupppppp'
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('New message', data)
})