const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//new messages
msgSchema.statics.addMessage = async function (sender, receiver, message) {
    if (!sender || !receiver || !message) {
        throw new Error("Sender, receiver, and message are required.");
    }
    
    const msg = await this.create({
        sender,
        receiver,
        message,
        time: new Date(),
    });
    return msg;
};

//get by senderId
msgSchema.statics.getMessagesBySender = async function (sender) {
    if (!sender) {
        throw new Error("Sender is required.");
    }
    const messages = await this.find({ sender }).sort({ time: -1 });
    if (!messages) {
        throw new Error("Messages not found.");
    }
    return messages;
};

//get by receiverId
msgSchema.statics.getMessagesByReceiver = async function (receiver) {
    if (!receiver) {
        throw new Error("Receiver is required.");
    }
    const messages = await this.find({ receiver }).sort({ time: -1 });
    if (!messages) {
        throw new Error("Messages not found.");
    }
    return messages;
};

module.exports = mongoose.model("Msg", msgSchema);