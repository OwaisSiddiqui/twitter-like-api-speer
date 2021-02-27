import connectToDatabase from './mongodb'
import bcrypt from 'bcrypt'

const saltRounds: number = 10

const loginUser = async (user: any) => {
    if (typeof user == "object") {
        const { db } = await connectToDatabase()
        const collection = db.collection("users")
        const userHashedPassword = (await collection.findOne({username: user.username})).password;
        return await bcrypt.compare(user.password, userHashedPassword)
        .then((result: boolean) => {
            return result
        })
        .catch(error => {
            throw error
        })
    } else {
        throw TypeError("Parameter of 'user' is not of type object.")
    }
}

export default loginUser