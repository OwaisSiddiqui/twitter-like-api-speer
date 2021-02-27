import express from 'express'

import isUsernameAvailable from '../util/isUsernameAvailable'
import loginUser from '../util/loginUser'

const router: express.Router = express.Router()

// Override SessionData type to include new parameters
declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

const verifyBody = (body: any) => {
    return typeof body.username == "string" &&  typeof body.password == "string" && body.username && body.password
}

const isUserLoggedIn = (req: any, res: any, next: any) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        next()
    }
}

router.get('/', isUserLoggedIn, (req, res) => {
    res.send("Send a POST request to this route with a username and password to login.")
})

router.post('/', isUserLoggedIn, async (req, res) => {
    const isLoggedIn = req.session.user
    if (!isLoggedIn) {
        var isVerified = verifyBody(req.body);
        if (isVerified) {
            const username = req.body.username
            const password = req.body.password
            var isAvailable = await isUsernameAvailable(username)
            if (!isAvailable) {
                var isLogin = await loginUser({username: username, password: password})
                if (isLogin) {
                    req.session.user = username
                    res.redirect('/')
                } else {
                    res.status(401)
                    res.send("The password for the username provided is incorrect.")
                }
            } else {
                res.status(409)
                res.send("Username '" + username + "' does not exist.")
            }
        } else {
            res.status(422)
            res.send("Either missing username, password parameters or parameters are not of type string.")
        }
    } else {
        res.redirect('/')
    }
})

export default router