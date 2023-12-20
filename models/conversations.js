const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  users: {
    type: Array,
    require: true,
  }
});

module.exports = mongoose.model("Conversation", conversationSchema);
