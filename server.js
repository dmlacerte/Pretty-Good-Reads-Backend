require('dotenv').config()

const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const bookControllers = require('./controllers/bookControllers')
const ratingControllers = require('./controllers/ratingControllers')


app.use('/book', bookControllers)
app.use('/rate', ratingControllers)
app.use('/node_modules', express.static(__dirname + '/node_modules'))


app.get('/', (req, res) => {
    res.send('<h1>we in</h1>')
})

const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log(`Pretty Good Reads Back End is running on port ${port}`)
})
