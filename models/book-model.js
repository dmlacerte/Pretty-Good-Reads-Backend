const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true 
        },
        authors: {
            type: [{type: String}],
            required: true
        },
        publisher: String,
        publishedDate: String,
        description: String,
        industryIdentifiers: [{type: Object}],
        readingModes: Object,
        pageCount: Number,
        printType: String,
        categories: [{type: String}],
        ratings: [{type: ObjectId, ref: 'Rating'}],
        maturityRating: String,
        allowAnonLogging: Boolean,
        contentVersion: String,
        panelizationSummary: Object,
        imageLinks: {smallThumbnail: {type:String}, thumbnail: {type:String}},
        language: String,
        previewLink: String,
        infoLink: String,
        canonicalVolumeLink: String
    },
    {timestamps: true}
)

const Book = mongoose.model('Book', BookSchema)
module.exports = Book