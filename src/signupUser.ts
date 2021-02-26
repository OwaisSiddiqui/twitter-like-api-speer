import connectToDatabase from './mongodb'
import bcrypt from 'bcrypt'

const saltRounds: number = 10

const signupUser = async (user: any): Promise<any> => {
    if (typeof user == "object") {
        const secureUser = {"username": user.username, "password": ""}
        const { db } = await connectToDatabase()
        const collection = db.collection("users")
        return await bcrypt.hash(user.password, saltRounds)
        .then(async (hash: string) => {
            secureUser.password = hash
            return await collection.insertOne(secureUser).then((result) => {
                if (result.result.ok) {
                    return true
                } else {
                    throw Error("InsertOne operation failed.")
                }
            })
        })
        .catch(error => {
            throw error
        })
    } else {
        throw TypeError("Parameter of 'user' is not of type object.")
    }
}

export default signupUser