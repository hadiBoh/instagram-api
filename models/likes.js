const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Post"
    }
})

module.exports = mongoose.model('Like' , likeSchema)