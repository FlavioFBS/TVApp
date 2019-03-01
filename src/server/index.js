var http = require('http')
var express = require('express')
var api = require('./api/index')
var mongoose = require('mongoose')
var socketio = require('socket.io')
var { incrementarVoto } = require('./lib')

const app = express()
const directorioArchivosEstaticos = 'public'
// config
let port = 3000
let hostname = 'localhost'
// conexion a BBDD:
mongoose.connect('mongodb://localhost/tvify')

app.use(express.static(directorioArchivosEstaticos)) // registro de middleware
// montar router en api
app.use('/api', api)
// express se encargará de la gestión del backend
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
  // socket es el cliente que se conectó, y a partir de ahí es que el servidor y el socket se conectarán
  console.log(`Conectador --> ${socket.id}`)
  // esperar el evento 'vote'
  socket.on('vote', id => {
    // responder con un 'pong'
    console.log(`enviado pong desde el servidor-- id: ${id}`)
    incrementarVoto(id, (err, vote) => {
      if (err) return socket.emit('vote:error', err)

      // evento que avise ya se realizo el voto
      socket.emit('vote:done', vote)
    })
    socket.emit('pong')
  })
})

// la parte nativa se encargará que la ejecución del servidor -- de modo q socket.io se enlace al servidor
server.listen(port, hostname, () => {
  console.log(`Conectado por el puerto----> ${port}`)
})
