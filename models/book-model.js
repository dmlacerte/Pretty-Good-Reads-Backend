const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true 
        },
        author: {
            type: String,
            required: true
        },
        genres: [{type: String}],
        tags: [{type: String}],
        ratings: [{type: ObjectId, ref: 'Rating'}]
    },
    {timestamps: true}
)

const Book = mongoose.model('Book', BookSchema)
module.exports = Book