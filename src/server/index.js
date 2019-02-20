/* const http = require('http')
var assets = require('./assets')
*/
var express = require('express')
var app = express()
var api = require('./api/index')
var mongoose = require('mongoose')

// conexion a BBDD:
mongoose.connect('mongodb://localhost/tvify')

var directorioArchivosEstaticos = 'public'
app.use(express.static(directorioArchivosEstaticos))// registro de middleware

app.use('/api/votes', (req, res, next) => {
  console.log(`middleware 1`)
  next()
})

app.use('/api/votes', (req, res, next) => {
  console.log(`middleware 2`)
  next()
})

// montar router en api
app.use('/api', api)

// config
let port = 3000
let hostname = 'localhost'
/** @OtraForma
  fs.readFile('./public/index.html', (err, data) => {
  if (err) {
    return console.log("no se abrio el archivo...", err.message)
  }
  res.end(data.toString())
})
  break
*/
/*
function webServer(req, res) {
  console.log("recibi un request: " + req.url)
  switch (req.url) {
    case '/':
      assets.leer('index.html',(err,content) => {
        res.end(content)
      })
      break

    case '/app.js':
      assets.leer('app.js',(err,content) => {
        res.end(content)
      })
      break

    case '/app.css':
      assets.leer('app.css',(err,content) => {
        res.end(content)
      })
      break

    default:
      console.log(`hubo un error V:`)
      res.statusCode=404
      res.end('Página no encontrada v\':')
      break
  }
}
*/

try {
  // const server = http.createServer(webServer)
  app.listen(port, hostname, () => {
    console.log(`Conectado por el puerto--Express--> ${port}`)
  })
} catch (error) {
  console.log('Error: ' + error)
}
