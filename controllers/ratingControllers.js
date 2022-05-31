const express = require('express')
const router = express.Router()

const Rating = require('../models/rating-model')
const User = require('../models/user-model')
const Book = require('../models/book-model')


router.get('/book/:id', (req, res) => {
    Rating.find({book: req.params.id})
    .populate('user')
    .then(ratings => res.send(ratings))
    .catch(console.error)
})

router.get('/user/:id', (req, res) => {
    Rating.find({user: req.params.id})
    .then(ratings => res.send(ratings))
    .catch(console.error)
})

router.get('/:userId/:bookId', (req, res) => {
    Rating.findOne({user: req.params.userId, book: req.params.bookId})
    .then(rating => res.json(rating))
    .catch(console.error)
})

router.post('/:userId/:bookId/:starRating', (req, res) => {
    Rating.create({
        user: req.params.userId,
        book: req.params.bookId,
        score: parseInt(req.params.starRating)
    })
    .then(async (rating) => {
        console.log(`adding to book and user`)
        console.log(rating)
        await User.findByIdAndUpdate(req.params.userId, {$push: {ratings: rating._id}})
        await Book.findByIdAndUpdate(req.params.bookId, {$push: {ratings: rating._id}})
    })
    .then(element => res.json(element))
    .catch(console.error)
})

router.put('/:userId/:bookId/:starRating', (req, res) => {
    Rating.findOneAndUpdate({user: req.params.userId, book: req.params.bookId}, {
        score: parseInt(req.params.starRating)
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