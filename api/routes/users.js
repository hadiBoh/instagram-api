const express = require("express")
const router = express.Router()
const {createUser , getAllUsers , getUserById, updateUser, upload, updateUserBio} = require("../../controllers/userController")


router.route("/")
    .get(getAllUsers)
    .post(createUser)
    .put(upload ,updateUser)

router.route("/single")
    .get(getUserById)
    .put(updateUserBio)


module.exports = router