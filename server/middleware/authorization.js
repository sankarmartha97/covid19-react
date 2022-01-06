const jwt = require("jsonwebtoken")
require("dotenv").config()
module.exports = async (req, res, next) => {
    try {
        console.log(req.header("authorization"));
        // 1. Destructure the token from header
        let  jwtToken = req.header("authorization");

        // 2. If there's no token, dont authorize
        if(!jwtToken){
            return res.status(403).json({message:"Not authorised"})
        } 
        // 3. If token is present, Send the user_id from the jwt payload with the request
            const payload = jwt.verify(jwtToken,process.env.JWT_SECRET)
            req.user = payload
            next()

    } catch (error) {
        // console.log(error.message);
        return res.status(403).json({message:"Not authorised"})
        
    }
}