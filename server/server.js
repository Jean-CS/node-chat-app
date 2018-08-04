const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

// io -> web socket server. communicated between server/client
const io = socketIO(server);

app.use(express.static(publicPath))

// registers an event listener called 'connection'
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  // listens for an event
  socket.on('createMessage', (message, callback) => {
    console.log('Creating message', message);


    // emits an event to ALL CONNECTIONS
    io.emit('newMessage', generateMessage(message.from, message.text))

    callback('This is from the server')
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
})

server.listen(port, () => console.log('Server up on port', port))

// call app.listen on port 3000 - server is up on port 3000
//