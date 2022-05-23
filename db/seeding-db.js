const Book = require('../models/book-model')
const axios = require('axios')
require('dotenv').config({path: __dirname + '/../.env'})
const FileSystem = require('fs')
const bookSeeds = require('./book-seeds.json')


//Getting sample books
// axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:Sanderson&key=${process.env.API_KEY}`)
//     .then(res => {FileSystem.writeFile('./db/book-seeds.json', JSON.stringify(res.data.items), err => console.error)})
//     .catch(console.error)

let seedData = []
for(let i = 0; i < bookSeeds.length; i++) {
    seedData.push(bookSeeds[i].volumeInfo)
}
    
Book.deleteMany({})
    .then(() => Book.create(seedData))
    .then(element => console.log(`Entered ${element.length} Books`))  
    .catch(console.error)