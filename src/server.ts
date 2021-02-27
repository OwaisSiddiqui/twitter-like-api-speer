require('dotenv').config()
import express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectToDatabase from './utils/mongodb'
import signupRoute from './routes/signup'
import loginRoute from './routes/login'
import homeRoute from './routes/home'
import logoutRoute from './routes/logout'
import errorRoute from './routes/error'

const app: express.Express = express()
const port: number = parseInt(process.env.PORT ? process.env.PORT : "3000")
const host: string = process.env.HOST ? process.env.HOST : "localhost"
const redisClient = redis.createClient();
const redisPort: number = parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : "6379")
const sessionStore = require('connect-redis')(session);
const redisTtl: number = 86400

redisClient.on('connect', () => {
    console.log("Redis is connected.")
})

redisClient.on('ready', () => {
    console.log("Redis is ready.")
})

redisClient.on('error', (error: Error) => {
    console.log('Redis error: ', error);
});

app.use(session({
    secret: '8Jy#Y#PGDK#?xnPr',
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    cookie: {
        maxAge: 1 * 60 * 1000,
        sameSite: true,
        secure: false 
    },
    store: new sessionStore({ host: host, port: redisPort, client: redisClient, ttl: redisTtl })
}))
app.use(express.json())
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
        res.status(400)
        res.json({"message": "Invalid JSON body."})
    }
});
app.use('/', homeRoute)
app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('*', errorRoute)

connectToDatabase()

app.listen(port, host, () => {
    console.log("Connected to server.")
})

export default app