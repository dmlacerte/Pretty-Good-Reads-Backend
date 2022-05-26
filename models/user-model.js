const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique:true,
            index: { collation: {locale: 'en', strength:2 }}
        },
        avatar: String,
        wishlist: [{type: ObjectId, ref: 'Book'}],
        reading: [{type: ObjectId, ref: 'Book'}],
        finished: [{type: ObjectId, ref: 'Book'}],
        ratings: [{type: ObjectId, ref: 'Rating'}],
        googleId: String,
        //might need it
        // email: {
        //     type: String,
        //     required: true,
        //     trim: true,
        //     lowercase: true,
        //     unique: true,
        //     validate: [validator.isEmail, 'invalid email']
        // }
    },
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema)
module.exports = User