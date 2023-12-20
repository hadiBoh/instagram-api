const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Post"
    },
    comment:{
        type:String
    },
    date:{
        type:String
    } 
})

module.exports = mongoose.model('Comment' , commentSchema)