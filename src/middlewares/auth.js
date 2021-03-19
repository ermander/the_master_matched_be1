const UserModel = require("../users/schema")
const { verifyJWT } = require("../authentication/authTools")
// Middleware that verify if the validity of the jwt
const jwtMiddleware = async (req, res, next) => {
    try {
        // Reading the token      
        const token = req.header("Authorization").replace("Bearer ", "")

        // Verifying the token
        const decoded = await verifyJWT(token)

        // Checking if the user exists
        const user = await UserModel.findOne({_id: decoded._id})
        
        if(!user){
            throw new Error("User not found")
        }else{
            req.user = user
            next()
        }
    } catch (error) {
       next(error)
    }
}

module.exports = { jwt: jwtMiddleware }