const express = require("express")
const router = express.Router()
const {likeThePost ,deleteThePostLike, getTheLikes} = require("../../controllers/likeController")


router.route("/")
    .get(getTheLikes)
    .post(likeThePost)
    .delete(deleteThePostLike)


module.exports = router