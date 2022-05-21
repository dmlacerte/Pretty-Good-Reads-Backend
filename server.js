require('dotenv').config()

const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('<h1>we in</h1>')
})

const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log(`Pretty Good Reads Back End is running on port ${port}`)
})
