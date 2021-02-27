import express from 'express'

const router: express.Router = express.Router()

router.all('/', (req, res) => {
    res.status(404).json({"message": "This route does not exist."})
})

export default router