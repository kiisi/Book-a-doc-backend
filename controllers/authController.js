const validator = require('validator');
const UserModel = require('../models/userModel')
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require('../configs');

module.exports.register = async (req, res) =>{
    const registration_data = req.body

    const errors = {
        'first_name': '',
        'last_name': '',
        'email': '',
        'password': '',
        'confirm_password':''
    }

    let error_bool = false

    for (let key in registration_data){
        if(registration_data[key].trim() === ''){
            errors[key] = 'This is field is empty!'
            error_bool = true
        }
    }

    // Validate Email
    if(!validator.isEmail(registration_data.email)){
        errors.email = "Invalid email"
        error_bool = true
    }

    // Check if password and confirm password are the same
    if(registration_data.password !== registration_data.confirm_password){
        errors.confirm_password = "Password does not match"
        error_bool = true
    }

    if(error_bool) {
        return res.status(403).json({error: errors})
    }

    const { first_name, last_name, email, password } = registration_data

    try{
        await UserModel.create({ first_name, last_name, email, password })
        return res.status(201).json({success: 'Registration successful!'})

    }catch(err){
        if(err.code === 11000){
            errors.email = 'Email already exists'
        }
        if(err.message === 'incorrect email'){
            errors.email = 'Email not found!'
        }
        if(err.message === 'incorrect password'){
            errors.password = 'Password is incorrect!'
        }
        return res.status(403).json({error: errors})
    }

}

module.exports.login = async (req, res) =>{

    const login_data = req.body

    let errors = {
        'email':'',
        'password':''
    }

    let error_bool = false

    for (let key in login_data){
        if(login_data[key].trim() === ''){
            errors[key] = 'This is field is empty!'
            error_bool = true
        }
    }

    // Validate Email
    if(!validator.isEmail(login_data.email)){
        errors.email = "Invalid email"
        error_bool = true
    }

    if(error_bool){
        return res.status(403).json({error: errors})
    }

    const {email, password} = req.body

    try{

        const user = await UserModel.login(email, password)
        user.password = undefined
        console.log(user._id)
        const _tk = createJWT(user._id)

        res.cookie('jwt', _tk, { httpOnly: true, maxAge: 5 * 60 * 1000, secure: true })

        res.status(201).json({success: 'Login successful', data: user})
    }
    catch(err){
        let err_bool = false

        if(err.message === 'incorrect email'){
            errors.email = 'Email not found!'
            err_bool = true
        }
        if(err.message === 'incorrect password'){
            errors.password = 'Password is incorrect!'
            err_bool = true
        }
        console.log(err)

        if(err_bool){
            return res.status(403).json({error: errors})
        }else{
            return res.status(500).json({server_err: "An error occurred"})
        }
    }

}



// Create JWT Token

const createJWT = (id) =>{
    return jwt.sign({id}, JWT_SECRET_KEY, {
        expiresIn: '120s'
    })
}

// Verify User

module.exports.verifyUser = (req, res) =>{
    console.log("User allowed")
    res.json({userInfo: req.userInfo})
}