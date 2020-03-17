import express from 'express'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'

console.log('I am the server')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.set('port', 5000)
app.use('/', express.static(path.join(__dirname + '/../public')))

server.listen(5000, () => {
  console.log('Starting server on port 5000')
})

const players = {}
io.on('connection', socket => {
  socket.on('new player', () => {
    players[socket.id] = {
      x: 300,
      y: 300
    }
  })
  socket.on('movement', data => {
    let player = players[socket.id] || {}
    if (data.left) {
      player.x -= 5
    }
    if (data.up) {
      player.y -= 5
    }
    if (data.right) {
      player.x += 5
    }
    if (data.down) {
      player.y += 5
    }
  })
})

setInterval(() => {
  io.sockets.emit('state', players)
}, 1000 / 60)
