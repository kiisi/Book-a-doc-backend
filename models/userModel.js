const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    blood_group: {
        type: String
    },
    genotype: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    allergies: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })

// Before document is saved
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()

    this.password = await bcrypt.hash(this.password, salt)

    // `this` --> refers to the User model
    next()
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})

    if(user){
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if(isAuthenticated){
            return user
        }
        throw Error("incorrect password")
    }else{
        throw Error("incorrect email")
    }
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel