const Book = require('../models/book-model')
const User = require('../models/user-model')
const Rating = require('../models/rating-model')
const axios = require('axios')
require('dotenv').config({path: __dirname + '/../.env'})
const FileSystem = require('fs')
const bookSeeds = require('./book-seeds.json')
const userSeeds = require('./user-seeds.json')
const ratingSeeds = require('./rating-seeds.json')


//Getting sample books (only need to run once)
// axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:Sanderson&key=${process.env.API_KEY}`)
//     .then(res => {FileSystem.writeFile('./db/book-seeds.json', JSON.stringify(res.data.items), err => console.error)})
//     .catch(console.error)

let seedBooks = []
for(let i = 0; i < bookSeeds.length; i++) {
    seedBooks.push(bookSeeds[i].volumeInfo)
}
    
Book.deleteMany({})
    .then(() => Book.create(seedBooks))
    .then(element => console.log(`Entered ${element.length} Books`))  
    .catch(console.error)

User.deleteMany({})
    .then(() => User.create(userSeeds))
    .then(element => console.log(`Entered ${element.length} Users`))  
    .catch(console.error)

Rating.deleteMany({})
    .then(() => Rating.create(ratingSeeds))
    .then(element => console.log(`Entered ${element.length} Ratings`))  
    .catch(console.error)