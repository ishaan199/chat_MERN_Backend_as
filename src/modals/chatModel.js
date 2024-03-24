const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  chatName: { type: String },
  isGroupChat: { type: Boolean },
  users: [{ type: mongoose.Schema.type.objectId, ref: "User" }],
  latestMessage: {
    type: mongoose.Schema.type.objectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.type.objectId,
    ref: "User",
  },
});
const Chat = mongoose.Model("Chat", chatModel);
module.exports = Chat;
