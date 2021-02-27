import express from 'express'

const router: express.Router = express.Router()

const isUserLoggedIn = (req: any, res: any, next: any) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}

router.get('/', isUserLoggedIn, (req, res) => {
    res.json({"message": "Send a DELETE request to this route to logout."})
})

router.delete('/', isUserLoggedIn, (req, res) => {
    req.session.destroy((error: Error) => {
        if (error) {
            res.status(400)
            res.json({"message": "Internal server error. Please contact server administrators to resolve the issue."})
            throw error
        } else {
            res.status(200)
            res.json({"message": "Successfully logged out."})
        }
    })
})

router.all('/', (req, res) => {
    res.set('Allow', Object.keys({'GET': true, 'HEAD': true, 'DELETE': true}).join(', '));
    res.status(405).send({"message": req.method + " method not allowed."})
})

export default router