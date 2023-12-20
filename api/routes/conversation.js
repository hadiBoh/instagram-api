const express = require("express")
const router = express.Router()
const {createConversation , getConversation} = require("../../controllers/messageController")


router.route("/")
    .get(getConversation)
    .post(createConversation)




module.exports = router