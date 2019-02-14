var Vote = require('../models')
var express = require('express')
var expres = express()
var router = require('express').Router()

console.dir(router) // ver las propiedades de 'router'
// GET      api/post
router.get('/votes', (req, res) => {
    console.log('GET  /votes');
    Vote.find({}, (err, docs) => {
        if (err) {
            return res.sendStatus(500).json(err)
        }
        res.json(docs) //array de votos
    })
})

// POST     api/votes/<id>
router.post('/vote/:id', (req, res) => {
    //agregar voto a serie
    let id = req.params.id //tomar el valor de ':id'

    function onsave(vote) {
        return (err) => {
            if (err) {
                return res.sendStatus(500).json(err)
            }
            res.json(vote)
        }
    }

    //verificar si ya existe showId
    Vote.findOne({ showId: id }, (err, doc) => {
        if (doc) {
            //actualizar este doc
            doc.count = doc.count + 1
            doc.save(onsave(doc))
        }
        else {
            //crear nuevo doc con count 1
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


module.exports = router;
