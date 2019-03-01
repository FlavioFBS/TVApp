var { getVoto, incrementarVoto, addVoto } = require('../lib')
var router = require('express').Router()
var tvmaze = require('tv-maze')
const client = tvmaze.createClient()

console.dir(router) // ver las propiedades de 'router'

// GET      api/post
router.get('/votes', (req, res) => {
  console.log('GET  /votes')
  getVoto((err, docs) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    res.json(docs) // array de votos
  })
})

// POST     api/votes/<id>
router.post('/vote/:id', (req, res) => {
  // agregar voto a serie
  let id = req.params.id // tomar el valor de ':id'

  incrementarVoto(id, (err, vote) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    res.json(vote)
  })
})

router.get('/shows', (req, res) => {
  console.log(`en api/shows`)
  client.shows((err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    addVoto(shows, shows => {
      console.log(`api/shows--> luego de addVoto`)
      // devuelve lista de shows
      res.json(shows)
    })
  })
})

// para búsqueda de shows
router.get('/search', (req, res) => {
  // en nuestro caso, res tendrá una propiedad query.q
  let query = req.query.q // parametro de busqueda
  client.search(query, (err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    // adaptando 'shows' al json que manda el api con search/shows
    shows = shows.map(show => show.show)
    // "transformacion de datos"
    addVoto(shows, shows => {
      res.json(shows)
    })
  })
})

module.exports = router
