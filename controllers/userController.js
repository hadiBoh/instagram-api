const {v4:uuid} = require('uuid')
const bcrypt = require("bcrypt")
const path = require("path")
const multer = require("multer")
const User = require('../models/users')


const createUser = async (req , res)=>{
    const {username , password} = req.body

    if(username === "profile") return res.status(400).json({message:" this username is forbidden to use!"})
    if (!username || !password) return res.status(400).json({message:"username and password are required!"})
    const duplicate = await User.findOne({username}).lean().exec()
    if (duplicate) {
        return res.status(400).json({message:" this username is taken already!"})
    }
    const hashedPassword = await bcrypt.hash(password , 10)
    const data = { username , password:hashedPassword , bio:"" , profile:""}

    const user = await User.create(data)

    if (user) {
        return res.json({message:"user "+username+" created"})  
    }
    return res.status(400).json({message:"somethind went wrong"}) 

}
const getAllUsers = async (req , res)=>{

    try {
        const users = await User.find().select('-password').lean()
        return res.json({users})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}


const updateUser = async (req , res)=>{
    const {userId} = req?.body
    const route = req?.file.path

    
    try {
            const user = await User.findById(userId).exec()
    
    const newRoute = route?.replace("images" , "images/")
    const entries = {
        img:newRoute?.replace("profile" , "profile/")
    } 
        user.profile = entries.img
        await user.save()
        return res.json({message:"updated!"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const updateUserBio = async (req , res)=>{
    
    const {userId , bio} = req.body

    
    try {
            const user = await User.findById(userId).exec()
    const entries = {
        bio
    } 
        user.bio = entries.bio
        await user.save()
        return res.json({message:"updated!"})
    } catch (error) {
        res.status(400).json({message:error.message})
    } 

}

const storage = multer.diskStorage({
    destination:(req , file ,cb)=>{
        cb(null , 'images/profile')
    },
    filename:(req , file , cb)=>{
        cb(null , Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:'500'},
    fileFilter:(req, file ,cb)=>{
        const fileType = /jpeg|jpg|png|gif/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null,true)
        }
        cb('File size or type is inccorect')
    }
}).single('profile')


const getUserById = async (req , res)=>{
    const {userId} = req.body
    try {
        const result = await User.findById(userId).exec()
        return res.json(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    upload,
    updateUserBio
}
