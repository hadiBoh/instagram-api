const express = require("express")
const router = express.Router()
const {createComment , getAllComments, getAllCommentsByPostId} = require("../../controllers/commentController")


router.route("/")
    .get(getAllComments)
    .post(createComment)

router.route("/userComments")
    .get(getAllCommentsByPostId)




module.exports = router