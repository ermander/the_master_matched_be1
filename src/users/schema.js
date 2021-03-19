const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshTokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
    },
    { timestamps: true }
)

// Checks if the credential are correct
UserSchema.statics.findByCredentials = async (email, password) => {
    // Checks if the user exists
    const user = await UserModel.findOne({email: email})
    // Do only if user exists
    if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        
        //Do only if the 2 password matches
        if(isMatch) return user
        else return null
    }else{
        return null
    }
}


// Chiedere il significato di questa funzione

UserSchema.pre("save", async function (next) {
    const user = this
    // Check if the password is modified
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})


const UserModel = model("users", UserSchema)
module.exports = UserModel