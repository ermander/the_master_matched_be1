const atob = require("atob")
const UserModel = require("../users/schema")

// Basic authentication function
const basicAuthenticationMiddleware = async (req, res, next) => {
    // Checks if the header has the autthorization
    if(!req.header.authorizazion){
        const error = new Error("Authorizazion header missing!")
        error.httpStatusCode = 401
    }else{
        // Getting the credentials
        const credentials = req.header.authorizazion.split(" ")[1]
        console.log(req.header.authorizazion.split(" ")[1])
        const [email, password] = atob(credentials).split(":")

        // Checks if the user exists
        const user = await UserModel.findByEmailAndPassword(email, password)
        console.log(user)

        if(user) {
            req.user = user
        }else{
            const error = new Error("Problems with credentials")
            error.httpStatusCode = 400
            next(error)
        }
    }
}

module.exports = { basicAuthenticationMiddleware }