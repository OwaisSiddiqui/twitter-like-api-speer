import express from 'express'

const router: express.Router = express.Router()

const isUserLoggedIn = (req: any, res: any, next: any) => {
    if (req.session.user) {
        res.send("Welcome " + req.session.user + ".")
    } else {
        next()
    }
}

router.get('/', isUserLoggedIn, (req, res) => {
    res.send("Welcome to Twitter! To signup, please go to the /signup route. If you already have an account, please go to the /login route.")
})

router.get('/', (req, res) => {

})

export default router