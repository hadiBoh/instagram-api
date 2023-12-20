const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/users")


const login = async(req , res)=>{
    const {username , password} = req.body
    if(!username || !password) return res.status(400).json({message:"username or password is empty!"})
    const user = await User.findOne({username}).lean()

    if(!user) return res.status(401).json({message:"not subscribed!"})

    const matchPass = await bcrypt.compare(password, user?.password)

    if(!matchPass) return res.status(401).json({message:"unAuthorized"})

    const accessToken = jwt.sign(
        {username},
        process.env.AT,
        {expiresIn:"15m"}
    )

    const refreshToken = jwt.sign(
        {username},
        process.env.RT,
        {expiresIn:"7d"}
    )

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite:"None" , secure:true , maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.json({ accessToken , userId:user._id , username:user.username })
}


const refresh = async(req , res)=>{
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({message:'unAuthorized'})

    const refreshToken = cookies?.jwt

    jwt.verify(
        refreshToken,
        process.env.RT,
        async (error , decoded)=>{
            if(error) return res.status(403).json({message:"forbidden!"})

            const accessToken = jwt.sign(
                {username:decoded.username},
                process.env.AT,
                {expiresIn:"15m"}
            )
            const user = await User.findOne({username:decoded.username}).lean()
            return res.json({accessToken , userId:user._id , username:user.username})
        }
    )
}

const logout = async(req , res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(200).json({message:'unthuthorized'})
    
    res.clearCookie('jwt',{httpOnly:true , secure:true , sameSite:'None' , maxAge: 7 * 24 * 60 * 60 * 1000 })

    res.json({message:'Logged Out'})
}



module.exports = {
    login,
    refresh,
    logout
}