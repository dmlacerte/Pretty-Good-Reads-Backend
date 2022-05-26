const express = require('express')
const router = express.Router()

const Rating = require('../models/rating-model')


router.get('/book/:id', (req, res) => {
    Rating.find({book: req.params.id})
    .then(ratings => res.send(ratings))
    .catch(console.error)
})

router.get('/user/:id', (req, res) => {
    Rating.find({user: req.params.id})
    .then(ratings => res.send(ratings))
    .catch(console.error)
})

router.post('/post', (req, res) => {
    Rating.create(req.body)
    .then(rating => res.send(rating))
    .catch(console.error)
})

router.put('/:id', (req, res) => {
    Rating.findByIdAndUpdate(req.params.id, {
        score: req.body.score
    })
    .then(rating => res.send(rating))
    .catch(console.error)
})

router.delete('/:id', (req, res) => {
    Rating.findByIdAndDelete(req.params.id)
    .then(rating => res.send(rating))
    .catch(console.error)
})

module.exports = router