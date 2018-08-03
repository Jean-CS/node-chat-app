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

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
})

server.listen(port, () => console.log('Server up on port', port))

// call app.listen on port 3000 - server is up on port 3000
// 