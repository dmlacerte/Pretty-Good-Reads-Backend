const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require('../models/user-model')

router.post('/api/v1/auth/google', async (req, res) => {
    const { token }  = req.body
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

        await user.save();
    }

    res.json({ user, token });
})

module.exports = router