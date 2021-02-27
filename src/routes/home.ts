import express from 'express'

const router: express.Router = express.Router()

const isUserLoggedIn = (req: any, res: any, next: any) => {
    if (req.session.user) {
        res.json({"message": "Welcome " + req.session.user + "."})
    } else {
        next()
    }
}

router.get('/', isUserLoggedIn, (req, res) => {
    res.json({"message": "Welcome to Twitter! To signup, please go to the /signup route. If you already have an account, please go to the /login route."})
})

router.all('/', (req, res) => {
    res.set('Allow', Object.keys({'GET': true, 'HEAD': true}).join(', '));
    res.status(405).send({"message": req.method + " method not allowed."})
})

export default router