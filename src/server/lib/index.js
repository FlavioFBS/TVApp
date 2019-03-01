var Vote = require('../models')

function incrementarVoto (id, callback) {
  console.log(`en incrementarVoto`)
  // verificar si ya existe showId
  Vote.findOne({ showId: id }, (err, doc) => {
    if (!err && doc) {
      // actualizar este doc
      doc.count = doc.count + 1
      doc.save((err) => {
        if (err) return callback(err)
        callback(null, doc)
      })
    } else {
      // crear nuevo doc con count 1
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save((err) => {
        if (err) return callback(err)
        callback(null, vote)
      })
    }
  })
}
// funcion para obtener los 'likes' de cada show:
function addVoto (shows, callback) {
  console.log(`en addVoto`)
  getVoto((err, votes) => {
    if (err) votes = []
    shows = shows.map(show => {
      let vote = votes.filter(vote => vote.showId === show.id)[0]
      show.count = vote ? vote.count : 0 // dar valor del voto (si existe)
      return show
    })
    callback(shows)
  })
}

function getVoto (callback) {
  console.log(`en getVoto`)
  // hace consulta
  // buscar todos los votos:
  Vote.find({}, (err, votes) => {
    if (err) return callback(err)
    callback(null, votes) // devolvere votos al callback
  })
}

module.exports = {
  incrementarVoto,
  addVoto,
  getVoto
}
