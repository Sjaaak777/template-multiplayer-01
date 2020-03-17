import './styles.css'
import Socket from 'socket.io-client'
const socket = Socket()

const movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true
      break
    case 87: // W
      movement.up = true
      break

    case 68: // D
      movement.right = true
      break
    case 83: // S
      movement.down = true
      break
  }
})
document.addEventListener('keyup', event => {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false
      break
    case 87: // W
      movement.up = false
      break
    case 68: // D
      movement.right = false
      break
    case 83: // S
      movement.down = false
      break
  }
})

socket.emit('new player')

setInterval(() => {
  socket.emit('movement', movement)
}, 1000 / 60)

const canvas = document.getElementById('game-screen')
canvas.width = 640
canvas.height = 480
const context = canvas.getContext('2d')

socket.on('state', players => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'orange'
  for (let id in players) {
    const player = players[id]
    context.beginPath()
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI)
    context.fill()
  }
})
