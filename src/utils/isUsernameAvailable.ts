import connectToDatabase from './mongodb'

const isUsernameAvailable = async (username: string) => {
    if (typeof username == "string") {
        const { db } = await connectToDatabase()
        const collection = db.collection("users")
        return await collection.countDocuments({ username: username }).then((result) => {
            if (typeof result == "number") {
                return result == 0
            } else {
                throw Error("CountDocuments operation failed.")
            }
        })
        .catch(error => {
            throw error
        })
    } else {
        throw TypeError("Username is not a string.")
    }
}

export default isUsernameAvailable