const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    img:{
        type:String,
        require:true
    },
    caption:{
        type:String
    },
    date:{
        type:String
    }
})

module.exports = mongoose.model('Post' , postSchema)