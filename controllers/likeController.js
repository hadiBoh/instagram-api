const Like = require("../models/likes")
const Post = require("../models/posts")


const likeThePost = async (req , res)=>{
    const {userId , postId} = req.body
    const posts = await Post.find().lean()
    const userLikedAlready = posts?.some(like => like.user === userId && like.post === postId)
    if(userLikedAlready) return res.status(400).json({message:"you have already liked!"})
    data = {user:userId, post:postId}
    try {
       const response = await Like.create(data)
        return res.json(response)
    } catch (error) {
        return res.json(error)
    }
}

const getTheLikes = async (req , res)=>{

    try {
       const response = await Like.find().lean()
        return res.json({likes:response})
    } catch (error) {
        return res.json(error)
    }
}

const deleteThePostLike = async (req , res)=>{
    const {postId , userId} = req.body

    try {
       const response = await Like.findOne({user: userId , post:postId}).exec()

       await response.deleteOne()

        return res.json({likes:response})
    } catch (error) {
        return res.json(error)
    }
}


module.exports = {
    likeThePost,
    getTheLikes,
    deleteThePostLike
}

