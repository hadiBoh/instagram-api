const { sub } = require("date-fns")
const Message = require("../models/messages")
const Conversation = require("../models/conversations")


const createMessage = async(req , res)=>{
    const {msg , sender , convId} = req.body

    const date = sub(new Date() , {minutes:0}).toISOString()
    const data = {msg , sender , convId ,date}

    try {
        const response = await Message.create(data)
        res.json(response)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const createConversation = async(req , res)=>{
    const {sender , reciver} = req.body

/*     const already = await Conversation.find({users : {$in: [sender , reciver]}})

    if (already) {
        return res.status(400).json({message: "Alredy created"})
    } */

    const data = [sender , reciver]


    try {
        const response = await Conversation.create({users:data})
        res.json(response)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const getMessages = async(req , res)=>{
    const {convId} = req.query
    try {
        const response = await Message.find({convId}).lean()
        res.json(response)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const getConversation = async(req , res)=>{
    const {user} = req.query
    try {
        const response = await Conversation.find({users : {$in: [user]}})
        res.json(response)
    } catch (error) {
        res.status(400).json({message:error})
    }
}


module.exports = {
    createMessage,
    createConversation,
    getMessages,
    getConversation
}