

const fs = require('fs')
const fsPromises = require("fs/promises")
const path = require("path")

const sizeError = async(req , res , next)=>{
    const response = await fsPromises.readFile(path.join(__dirname , ".." , "sizeLog" , "sizeLog.log"))
    const NO = "no"
    if (response === "yes") {
        await fsPromises.writeFile(path.join(__dirname , ".." , "sizeLog" , "sizeLog.log") , NO)
        return res.status(400).json({message:"filze parametr or size is large"})
    }
    next()
}


const resultOfSize = async(msg)=>{
    if (!fs.existsSync(path.join(__dirname , ".." , "sizeLog" ))) {
        await fsPromises.mkdir(path.join(__dirname , ".." , "sizeLog"))
    }
    await fsPromises.writeFile(path.join(__dirname , ".." , "sizeLog" , "sizeLog.log") , msg)
}

module.exports ={
    resultOfSize,
    sizeError
}