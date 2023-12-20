
const multer = require("multer")
const path = require("path")
const Post = require("../models/posts")

const {sub} = require("date-fns")


const createPost = async(req , res)=>{
    const {user , caption } = req.body
    
    const date = sub(new Date() , {minutes:0}).toISOString()

    if(!user) return res.status(400).json({message:"userId is required!"})

    const route = req?.file.path
    
    const cutRoute = route.substr(15)
    

    data = {user ,caption ,img:`images/postImg/${cutRoute}` , date}
    try {
        const response = await Post.create(data)
        return res.json(response)
    } catch (error) {
       
        return res.status(400).json({message:error.message})
    }
}

const getAllPosts = async(req , res)=>{
    try {
        const response = await Post.find().lean()
        
        res.json({length:response.length})
    } catch (error) {
        res.json({message:error.message})
    }
}

const pageAmount = 5

const getPostsByPage = async(req , res)=>{
    const {page} = req.query
    const posts = await Post.find().lean()
    const end = page*pageAmount-1
    const start = page*pageAmount-pageAmount
    const sorted = posts.sort((a,b)=> b.date.localeCompare(a.date))
    const filtered = sorted.filter((post , i)=> {

        if(i <= end && i>=start){
            return post
        }  
    })
    return res.json({filtered ,length: posts.length})
}

const getPostsByUserId = async(req , res)=>{

    const {userId} = req.query
    try {
        const response = await Post.find({user:userId}).lean()
        res.json(response)
    } catch (error) {
        res.json({message:error.message})
    }
}


const storage = multer.diskStorage({
    
    destination:(req , file ,cb)=>{
        cb(null , 'images/postImg')
    },
    filename:(req , file , cb)=>{
        cb(null , Date.now()+path.extname(file.originalname))
    }

})
 
const upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024},
    fileFilter:(req, file ,cb)=>{
        const fileType = /jpeg|jpg|png|gif|JPG|JPEG|PNG|GIF/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null,true)
        }

        

    }
}).single('postImg')



const getPostsByPostId = async(req , res)=>{

    const {postId} = req.query
    try {
        const response = await Post.findOne({_id:postId}).lean()
        res.json(response)
    } catch (error) {
        res.json({message:error.message})
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId,
    upload,
    getPostsByPage,
    getPostsByPostId
}