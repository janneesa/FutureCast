const { default: mongoose } = require("mongoose");
const Msg = require("../models/msgModel.js");

//GET /messages/sender/:senderId
const getMessagesBySender = async (req, res) => {
    const { sender } = req.params;
    try {
        const messages = await Msg.getMessagesBySender(sender);
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//GET /messages/reciever/:receiverId
const getMessagesByReceiver = async (req, res) => {
    const { receiver } = req.params;
    try {
        const messages = await Msg.getMessagesByReceiver(receiver);
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//CREATE /messages
const addMessage = async (req, res) => {
    const { sender, receiver, message } = req.body;
    try {
        const msg = await Msg.addMessage(sender, receiver, message);
        res.status(201).json(msg);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//DELETE /messages/:messageId
const deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        return res.status(400).json({ message: "Invalid message ID" });
    }
    
    try {
        const msg = await Msg.findByIdAndDelete(messageId);
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getMessagesBySender,
    getMessagesByReceiver,
    addMessage,
    deleteMessage,
};
