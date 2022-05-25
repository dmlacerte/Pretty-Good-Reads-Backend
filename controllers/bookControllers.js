const express = require('express')
const router = express.Router()
const axios = require('axios')

const Book = require('../models/book-model')


router.get('/:title', (req, res) => {
    Book.findOne({"title" : req.params.title})
    .then(book => {
        //if (book) send it back
        //else search API
        res.send(book)
    })
    .catch(console.error)
})

router.post('/post', (req, res) => {
    Book.create(req.body)
    .then(book => res.send(book))
    .catch(console.error)
})

router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        $push: {ratings: req.body.rating}
    })
    .then(book => res.send(book))
    .catch(console.error)
})

router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(book => res.send(book))
    .catch(console.error)
})

module.exports = router