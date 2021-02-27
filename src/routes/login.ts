import express from 'express'

import isUsernameAvailable from '../utils/isUsernameAvailable'
import loginUser from '../utils/loginUser'

const router: express.Router = express.Router()

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

const verifyBody = (body: any) => {    
    return "username" in body && "password" in body && Object.keys(body).length == 2 && typeof body.username == "string" &&  typeof body.password == "string" && body.username && body.password
}

const isUserLoggedIn = (req: any, res: any, next: any) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        next()
    }
}

router.get('/', isUserLoggedIn, (req, res) => {
    res.json({"message": "Send a POST request to this route with a username and password to login."})
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
                    res.json({"message": "The password for the username provided is incorrect."})
                }
            } else {
                res.status(409)
                res.json({"message": "Username '" + username + "' does not exist."})
            }
        } else {
            res.status(422)
            res.json({"message": "Either missing username, password parameters or there are extraneous parameters, or username, password parameters are not of type string."})
        }
    } else {
        res.redirect('/')
    }
})

router.all('/', (req, res) => {
    res.set('Allow', Object.keys({'GET': true, 'HEAD': true, 'POST': true}).join(', '));
    res.status(405).send({"message": req.method + " method not allowed."})
})

export default router