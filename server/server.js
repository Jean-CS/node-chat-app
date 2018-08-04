const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

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

  // listens for an event
  socket.on('createMessage', (message) => {
    console.log('Creating message', message);
    
    // emits an event to ALL CONNECTIONS
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date()
    })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
})

server.listen(port, () => console.log('Server up on port', port))

// call app.listen on port 3000 - server is up on port 3000
// 