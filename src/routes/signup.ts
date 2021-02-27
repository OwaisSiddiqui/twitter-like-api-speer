import express from 'express'
import isUsernameAvailable from '../utils/isUsernameAvailable'
import signupUser from '../utils/signupUser'

const router: express.Router = express.Router()

const verifyBody = (body: any) => {    
    return "username" in body && "password" in body && Object.keys(body).length == 2 && typeof body.username == "string" &&  typeof body.password == "string" && body.username && body.password
}

router.get('/', (req, res) => {
    res.json({"message": "Send a POST request to this route with a username and password to signup."})
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
                    res.json({"message": "Internal server error. Please contact server administrators to resolve the issue."})
                }
            } else {
                res.status(409)
                res.json({"message": "Username is already taken. Please choose another username and try again."})
            }
        } else {
            res.status(422)
            res.json({"message": "Either missing username, password parameters or parameters are not of type string."})
        }
    } else {
        res.status(400)
        res.json({"message": "Cannot signup while having a logged in session. Please logout first."})
    }
})

export default router