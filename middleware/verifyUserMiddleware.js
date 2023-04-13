const { JWT_SECRET_KEY } = require("../configs")

module.exports = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log("Token from cookies", token)
    if(token){
        jwt.verify(token, JWT_SECRET_KEY, async (err, decodedToken) =>{
            console.log(decodedToken)
            if(err){
                console.log(err)
                res.status(403).json({error: "Unauthorized user"})
            }else{
                let user = await User.findById(decodedToken.id);
                user.password = undefined
                console.log(user)
                req.userInfo = user
                res.status(200).json({success: 'Authorized', data: user})
                next()
            }
        })
    }else{
        next()
    }
}