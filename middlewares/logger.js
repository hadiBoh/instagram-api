const asyncHandler = require("express-async-handler")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")

const logEvents = asyncHandler( async(msg)=>{
   
        if(!fs.existsSync(path.join(__dirname , ".." , "logs"))){
            await fsPromises.mkdir(path.join(__dirname , ".." , "logs"))
        }
        
        await fsPromises.appendFile(path.join(__dirname , ".." , "logs" , "logsFile.log") , msg)
    }
)

const logger = (req , res , next)=>{
    const msg = `${new Date()}\t${req.headers.origin}\t${req.method}\n`
    logEvents(msg)
    next()
}

module.exports = logger