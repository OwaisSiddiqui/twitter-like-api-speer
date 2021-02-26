require('dotenv').config()
import express from 'express'

import connectToDatabase from './mongodb'
import signupRoute from './routes/signup'

const app: express.Express = express()
const port: number = parseInt(process.env.PORT ? process.env.PORT : "3000")

app.use(express.json())
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
        res.status(400)
        res.send("Invalid JSON body.")
    }
});
app.use('/signup', signupRoute)

connectToDatabase()

app.get("/", (req, res) => {
    res.send("Welcome to Twitter! To signup, please go to the /signup route. If you already have an account, please go to the /login route.")
})

app.listen(port, "localhost", () => {
    console.log("Connected to server.")
})