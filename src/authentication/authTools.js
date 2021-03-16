const jwt = require("jsonwebtoken")

// Authenticate the user
const authenticate = async (user) => {
    try {
        const newToken = await generateJWT({_id: user._id})
        return newToken
    } catch (error) {
        console.log(error)
    }
}

// Generate the JWT token
const generateJWT = (payload) => new Promise ((res, rej) => {
    jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {expiresIn: 1000}, 
        (err, token) => {
            if (err) rej(err)
            res(token)
    })
})

// Verify if a token is valid
const verifyJWT = (token) => new Promise((res, rej) => {
    jwt.verify(
        token, 
        process.env.JWT_SECRET, 
        (err, verified) => {
            if (err) rej(err)
            res(verified)
    })
})

module.exports = authenticate