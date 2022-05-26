const mongoose = require('mongoose')
require('dotenv').config({path: __dirname + '/../.env'})

const mongoURI = process.env.NODE_ENV === 'production'
? process.env.DB_URL
: process.env.DEV_DB_URL

mongoose.connect(mongoURI)
    .then(instance => console.log(`connected to: ${instance.connections[0].name}`))
    .catch(err => console.log(`failed conn:`, err))


module.exports = mongoose