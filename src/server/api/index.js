var { getVoto, incrementarVoto, addVoto } = require('../lib')
var tvmaze = require('tv-maze')

var router = require('express').Router()
const client = tvmaze.createClient()

console.dir(router) // ver las propiedades de 'router'

router.get('/show/:id', (req, res) => {
  let id = req.params.id

  client.show(id, (err, show) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    res.json(show)
  })
})

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
  client.shows((err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    addVoto(shows, shows => {
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
