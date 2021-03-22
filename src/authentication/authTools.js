const jwt = require("jsonwebtoken")
const UserModel = require("../users/schema")

// Authenticate the user
const authenticate = async (user) => {
    try {
        console.log(user)
        const newToken = await generateJWT({_id: user._id})
        const newRefreshToken = await generateRefreshJWT({_id: user._id})
        user.refreshTokens = user.refreshTokens.concat({token: newRefreshToken})

        user.save()
        console.log(newToken, newRefreshToken + "oooooooooo")
        return { accessToken: newToken, refreshToken: newRefreshToken}
    } catch (error) {
        console.log(error)
    }
}

// Check the refreshToken

const checkRefreshToken = async(oldRefreshToken) => {
    // Verify the refreshToken
    const decoded = await verifyRefreshJWT(oldRefreshToken)

    // Checking in the db if the token exists
    const user = await UserModel.findOne({_id: decoded._id})

    if(!user){
        throw new Error("User not found!")
    }
    const currentRefreshToken = user.refreshTokens.find( token => token.token === oldRefreshToken )

    if(!currentRefreshToken){
        throw new Error("refresh token not found!")
    }

    const newToken = await generateJWT({ _id: user._id })
    const newRefreshToken = await generateRefreshJWT({ _id: user._id })

    // Delete all the refresh token from db and add the new one
    const newRefreshTokens = user.refreshTokens
        .filter( (token) => token.token !== oldRefreshToken)
        .concat({ token: newRefreshToken })

    // Saving to the db
    user.refreshTokens = [...newRefreshTokens]
    await user.save()

    return { accessToken: newToken, refreshToken: newRefreshToken}
}

// Generate the JWT token
const generateJWT = (payload) => new Promise ((res, rej) => {
    jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {expiresIn: "10h"}, 
        (err, token) => {
            if (err) rej(err)
            res(token)
    })
})

// Verify if a token is valid
const verifyJWT = (token) => 
    new Promise((res, rej) => {
        jwt.verify(
            token, 
            process.env.JWT_SECRET, 
            (err, verified) => {
                if (err) rej(err)
                res(verified)
    })
})

// Generate the refresh token
const generateRefreshJWT = (payload) => new Promise ((res, rej) => {
    jwt.sign(
        payload, 
        process.env.REFRESH_SECRET, 
        {expiresIn: "1 week"}, 
        (err, token) => {
            if (err) rej(err)
            res(token)
    })
})

// Verify if the refresh token is valid
const verifyRefreshJWT = (token) => 
    new Promise((res, rej) => {
        jwt.verify(
            token, 
            process.env.REFRESH_SECRET, 
            (err, verified) => {
                if (err) rej(err)
                res(verified)
    })
})




module.exports = { 
    authenticate,
    verifyJWT,
    verifyRefreshJWT,
    checkRefreshToken
}