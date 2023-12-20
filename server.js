const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
require('dotenv').config()
const logger = require("./middlewares/logger")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const corsOptions = require("./config/corsOptions")
const verifyJWT = require("./middlewares/verifyJWT")
const {fileCreator} = require("./middlewares/fileCreator")
const mongoose = require("mongoose")
const {connentDB} = require("./config/dbConnect")

connentDB()


/* app.use(logger) */

app.use(cors(corsOptions))
/* app.use(cors()) */


app.use(cookieParser())

app.use(express.json())

app.use(fileCreator)

app.use("/images" , express.static("images"))


app.use("/login" , require("./api/routes/auth"))
app.use("/register" , require("./api/routes/register"))
app.use("/refresh" , require("./api/routes/auth"))
app.use("/logout" , require("./api/routes/logout"))

app.use(verifyJWT)

app.use("/message" , require("./api/routes/message"))
app.use("/conversation" , require("./api/routes/conversation"))

app.use("/users" , require("./api/routes/users"))
app.use("/users/single" , require("./api/routes/users"))

app.use("/posts" , require("./api/routes/posts"))
app.use("/posts/userPosts" , require("./api/routes/posts"))
app.use("/posts/singlePost" , require("./api/routes/posts"))

app.use("/comments" , require("./api/routes/comments"))
app.use("/comments/userComments" , require("./api/routes/comments"))

app.use("/likes" , require("./api/routes/likes"))

mongoose.connection.once( 'open' ,()=>{
    console.log("connected to mongoDB");
    app.listen(PORT ,()=> console.log(`server running on port ${PORT}`))
})