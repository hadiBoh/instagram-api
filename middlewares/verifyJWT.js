const jwt = require("jsonwebtoken")


const verifyJWT = (req , res , next)=>{
    const authHeader = req.headers.authorization 

    if(!authHeader?.startsWith(`Bearer `)) return res.status(401).json({message:'unauthorized middleware'})

    const token = authHeader.split(" ")[1]
    
    jwt.verify(
        token,
        process.env.AT,
        (error , decoded)=>{
            if(error) return res.status(403).json({message:'forbidden middleware'})

            req.user = decoded.username
            next()
        }
    )

}

module.exports = verifyJWT