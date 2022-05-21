const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const RatingSchema = new mongoose.Schema(
    {
        book: {
            type: ObjectId,
            ref: 'Book',
            required: true
        }, 
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        }, 
        score: Number
    },
    {timestamps: true}
)

const Rating = mongoose.model('Rating', RatingSchema)
module.exports = Rating