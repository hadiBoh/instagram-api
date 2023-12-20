const express = require("express")
const router = express.Router()
const {createPost, getAllPosts, getPostsByUserId , upload , getPostsByPage, getPostsByPostId} = require("../../controllers/postController")
const { sizeError } = require("../../middlewares/sizeError")


router.route("/")
    .get(getAllPosts)
    .post(upload ,createPost)

router.route("/userPosts")
    .get(getPostsByUserId)

router.route("/singlePost")
    .get(getPostsByPostId)

router.route("/page")
    .get(getPostsByPage)




module.exports = router