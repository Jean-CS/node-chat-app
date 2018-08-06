const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

// io -> web socket server. communicated between server/client
const io = socketIO(server);

const users = new Users();

app.use(express.static(publicPath))

// registers an event listener called 'connection'
io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.')
    }
    
    socket.join(params.room);
    // remove user from previous rooms
    users.removeUser(socket.id);
    // add user to new room
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })

  // listens for an event
  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      // emits an event to ALL CONNECTIONS
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    } 

    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
})

server.listen(port, () => console.log('Server up on port', port))

// call app.listen on port 3000 - server is up on port 3000
//