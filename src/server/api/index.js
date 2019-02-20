var Vote = require('../models')
var router = require('express').Router()
var tvmaze = require('tv-maze')
const client = tvmaze.createClient()

console.dir(router) // ver las propiedades de 'router'

// funcion para obtener los 'likes' de cada show:
function addVotes (shows, callback) {
  // buscar todos los votos:
  Vote.find({}, (err, votes) => {
    if (err) votes = []
    shows = shows.map(show => {
      let vote = votes.filter(vote => vote.showId === show.id)[0]
      show.count = vote ? vote.count : 0 // dar valor del voto (si existe)
      return show
    })
    callback(shows)
  })
}

// GET      api/post
router.get('/votes', (req, res) => {
  console.log('GET  /votes')
  Vote.find({}, (err, docs) => {
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

  function onsave (vote) {
    return (err) => {
      if (err) {
        return res.sendStatus(500).json(err)
      }
      res.json(vote)
    }
  }

  // verificar si ya existe showId
  Vote.findOne({ showId: id }, (err, doc) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    if (doc) {
      // actualizar este doc
      doc.count = doc.count + 1
      doc.save(onsave(doc))
    } else {
      // crear nuevo doc con count 1
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(onsave(vote))
    }
  })
  /* para uso sin BBDD
  if(votes[id] === undefined){
    votes[id] = 1
  }
  else{
    votes[id] = votes[id]+1
  }
  res.json({votes: votes[id]})
  */
})

router.get('/shows', (req, res) => {
  client.shows((err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    addVotes(shows, shows => {
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
    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

module.exports = router
