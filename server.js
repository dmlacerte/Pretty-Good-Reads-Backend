require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

//user authentication
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const bookControllers = require('./controllers/bookControllers')
const ratingControllers = require('./controllers/ratingControllers')


app.use('/book', bookControllers)
app.use('/rate', ratingControllers)
app.use('/node_modules', express.static(__dirname + '/node_modules'))


app.get('/', (req, res) => {
    res.send('<h1>we in</h1>')
})

//user authentication
app.post('/api/v1/auth/google', async (req, res) => {
    const { token }  = req.body
    console.log(req.body)
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();    
    // const user = await db.user.upsert({ 
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })
    console.log(JSON.stringify(ticket.getPayload()));
    res.status(201)
    // res.json({ "name" : "test"})
})

const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log(`Pretty Good Reads Back End is running on port ${port}`)
})
