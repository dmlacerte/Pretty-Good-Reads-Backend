require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin : 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())

const bookControllers = require('./controllers/bookControllers')
const ratingControllers = require('./controllers/ratingControllers')
const userControllers = require('./controllers/userControllers')

app.use('/', userControllers)
app.use('/book', bookControllers)
app.use('/rate', ratingControllers)
app.use('/node_modules', express.static(__dirname + '/node_modules'))


app.get('/', (req, res) => {
    res.send('<h1>we in</h1>')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Pretty Good Reads Back End is running on port ${port}`)
})
