const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require('../models/user-model')

/* HTTP COOKIE AUTH ONLY */
//Helper function to log out a user and remove browser cookie
// const clearUserTokenAndDeauthenticate = (res) => {
//     res.clearCookie("token")
//     res.json({ authenticated: false, user: null })
// }

//Authenticate and create new users, and set a browser cookie
router.post('/user/login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload()

    let user = await User.findOne({ googleId: payload?.sub })
        .populate('wishlist')
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

    /* HTTP COOKIE AUTH ONLY */
    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite:'none',
    //     domain: process.env.NODE_ENV === 'production'
    //         ? 'pretty-good-reads.netlify.app'
    //         : 'localhost'
    // });

    res.json({ user, token });
})

//Set a user as authenticated if the browser passes back a cookie
router.get('/user/me', async (req, res) => {
    /* Below for HTTP cookie authentication method only */
    // const { token } = req.cookies
    const { token } = req.headers
    if (token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });

            const payload = ticket.getPayload()

            let user = await User.findOne({ googleId: payload?.sub })
                .populate('ratings')
                .populate('wishlist')
            res.json({ authenticated: true, user })
        } catch (err) {
            console.log(err);
            /* HTTP COOKIE AUTH ONLY */
            // clearUserTokenAndDeauthenticate(res)
        }
    } 
    /* HTTP COOKIE AUTH ONLY */
    // else {
    //     clearUserTokenAndDeauthenticate(res)
    // }
})

//Log a user out
router.get('/user/logout', (req, res) => {
    clearUserTokenAndDeauthenticate(res)
})

router.put('/user/updateList/', async (req, res) => {
    const list = req.body.list
    const userId = req.body.userId
    const bookId = req.body.bookId

    let query = {}
    query[list] = bookId
    console.log(query)

    await User.findByIdAndUpdate(userId, { $pull: { wishlist: bookId, reading: bookId, finished: bookId, } })

    if (list !== 'notRead') {
        await User.findByIdAndUpdate(userId, { $push: query })
    }

    res.send('updated')
})

module.exports = router