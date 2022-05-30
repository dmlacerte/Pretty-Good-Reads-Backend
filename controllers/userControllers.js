const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require('../models/user-model')

const clearUserTokenAndDeauthenticate = (res) => {
    res.clearCookie("token")
    res.json({ authenticated: false, user: null})
}

router.get('/user/me', async (req, res) => {
    const { token } = req.cookies
    if (token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
        
            const payload = ticket.getPayload()
        
            let user = await User.findOne({ googleId: payload?.sub })
            res.json({authenticated: true, user})
        } catch (err) {
            clearUserTokenAndDeauthenticate(res)
        }
    } else {
        clearUserTokenAndDeauthenticate(res)
    }
})

router.post('/user/login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload()

    let user = await User.findOne({ googleId: payload?.sub })
    if (!user) {
        user = await new User({
            name: payload?.name,
            avatar: payload?.picture,
            wishlist: [],
            reading: [],
            finished: [],
            ratings: [],
            googleId: payload?.sub
        });

        await user.save()
    }

    res.cookie("token", token, {
        httpOnly: true,
        secure: true
    });
    res.json({ user })
})

router.get('/user/logout', (req, res) => {
    clearUserTokenAndDeauthenticate(res)
})

router.get('/userBooks/:id', (req, res) => {
    User.findOne({ "googleId": req.params.id })
        .then(user => res.json(user))
        .catch(console.error)
})

module.exports = router