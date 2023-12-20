
const path = require("path")
const fsPromises = require("fs/promises")
const fs = require("fs")



const fileCreator = async (req , res , next)=>{
    if(!fs.existsSync(path.join(__dirname , ".." , "images"))){
        await fsPromises.mkdir(path.join(__dirname , ".." , "images"))
    }
    if(!fs.existsSync(path.join(__dirname , ".." , "images/postImg"))){
        await fsPromises.mkdir(path.join(__dirname , ".." , "images/postImg"))
    }
    if(!fs.existsSync(path.join(__dirname , ".." , "images/profile"))){
        await fsPromises.mkdir(path.join(__dirname , ".." , "images/profile"))
    }
    next()
}


module.exports = {
    fileCreator
}

