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
})