import express from 'express'
import isUsernameAvailable from '../util/isUsernameAvailable'
import signupUser from '../util/signupUser'

const router: express.Router = express.Router()

const verifyBody = (body: any) => {
    return typeof body.username == "string" &&  typeof body.password == "string" && body.username && body.password
}

router.get('/', (req, res) => {
    res.send("Send a POST request to this route with a username and password to signup.")
})

router.post('/', async (req: any, res: any) => {
    if (!req.session.user) {
        var isVerified = verifyBody(req.body);
        if (isVerified) {
            const username = req.body.username
            const password = req.body.password
            var isAvailable = await isUsernameAvailable(username)
            if (isAvailable) {
                var isSignedUp = await signupUser({username: username, password: password})
                if (isSignedUp) {
                    req.session.user = username
                    res.redirect('/')
                } else {
                    res.status(500)
                    res.send("Internal server error. Please contact server administrators to resolve the issue.")
                }
            } else {
                res.status(409)
                res.send("Username is already taken. Please choose another username and try again.")
            }
        } else {
            res.status(422)
            res.send("Either missing username, password parameters or parameters are not of type string.")
        }
    } else {
        res.status(400)
        res.send("Cannot signup while having a logged in session. Please logout first.")
    }
})

export default router