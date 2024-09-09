import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const jwtWebAuthentication = (req,res,next)=>{
     const data = req.Headers.Authorization
     if(!data) return res.status(404).json({error: 'no token present'})
        try{
        const response = req.Headers.Authorization.split(" ")[1];
        if(!response){
            return res.status(401).json({error: 'Unauthorized'})
        }
        const payload = jwt.verify(response, process.env.SALT_JWT)
        if(!payload) return res.status(402).json({message: "token not found"})
        console.log("Token is been verified")
        req.user = payload
        next(); 
    }
    catch(error){
        console.log("Error encountered")
        return res.status(500).json({error: 'error occured'})
    }
}


const generateToken = (payload) => {
    return jwt.sign(payload,process.env.SALT_JWT);
}

module.exports = { jwtWebAuthentication, generateToken };



