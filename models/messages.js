const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    convId:{
        type:String,
        require: true
    },
    sender:{
        type:String,
        require:true
    },
    msg:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Message' , messageSchema)