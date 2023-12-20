const express = require("express")
const router = express.Router()
const {login, refresh} = require("../../controllers/authController")


router.route("/")
    .post(login)
    .get(refresh)




module.exports = router