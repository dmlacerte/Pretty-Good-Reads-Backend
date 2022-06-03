const express = require('express')
const router = express.Router()

const Rating = require('../models/rating-model')
const User = require('../models/user-model')
const Book = require('../models/book-model')

//Get ratings by book
router.get('/book/:id', (req, res) => {
    Rating.find({book: req.params.id})
    .populate('user')
    .then(ratings => res.send(ratings))
    .catch(console.error)
})

//Get rating by book and user
router.get('/:userId/:bookId', (req, res) => {
    Rating.findOne({user: req.params.userId, book: req.params.bookId})
    .then(rating => res.json(rating))
    .catch(console.error)
})

//Create user & book rating
router.post('/:userId/:bookId/:starRating', (req, res) => {
    Rating.create({
        user: req.params.userId,
        book: req.params.bookId,
        score: parseInt(req.params.starRating)
    })
    .then(async (rating) => {
        await User.findByIdAndUpdate(req.params.userId, {$push: {ratings: rating._id}})
        await Book.findByIdAndUpdate(req.params.bookId, {$push: {ratings: rating._id}})
    })
    .then(element => res.json(element))
    .catch(console.error)
})

//Update user book comment
router.put('/:userId/:bookId', (req, res) => {
    Rating.findOneAndUpdate({user: req.params.userId, book: req.params.bookId}, 
        { comment: req.body.comment },
        { new: true }
    )
    .then(rating => res.send(rating))
    .catch(console.error)
})

//Update user book rating
router.put('/:userId/:bookId/:starRating', (req, res) => {
    Rating.findOneAndUpdate({user: req.params.userId, book: req.params.bookId}, {
        score: parseInt(req.params.starRating)
    })
    .then(rating => res.send(rating))
    .catch(console.error)
})

//Delete user book review
router.delete('/:userId/:bookId', (req, res) => {
    Rating.findOneAndDelete({user: req.params.userId, book: req.params.bookId})
    .then(rating => res.send(rating))
    .catch(console.error)
})

module.exports = router