const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../App");
const User = require("../models/userModel");
const Msg = require("../models/msgModel");

const api = supertest(app);

describe("Message Model Tests", () => {
  let senderToken = "";
  let receiverToken = "";
  let senderId = "";
  let receiverId = "";
  let receiver;
  let sender;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Msg.deleteMany({});

    // Create sender and receiver users
    const hashedPassword = await bcrypt.hash("password123", 10);

    sender = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      username: "testuser",
      password: hashedPassword,
      phone_number: "555-555-5555",
      date_of_birth: "1990-01-01",
      bio: "A test user bio",
      followers: [],
      following: [],
      predictions: [],
      successfulPredictions: [],
      predictionScore: 0,
      avatar: "",
      settings: {
        notifications: {
          email: true,
          push: true,
        },
        preferences: {
          darkMode: false,
        },
      },
    });

    receiver = await User.create({
      name: "Test User",
      email: "testuser2@example.com",
      username: "testuser22",
      password: hashedPassword,
      phone_number: "555-555-5555",
      date_of_birth: "1990-01-01",
      bio: "A test user bio",
      followers: [],
      following: [],
      predictions: [],
      successfulPredictions: [],
      predictionScore: 0,
      avatar: "",
      settings: {
        notifications: {
          email: true,
          push: true,
        },
        preferences: {
          darkMode: false,
        },
      },
    });

    senderToken = `Bearer ${require("jsonwebtoken").sign(
      { id: sender._id },
      process.env.SECRET,
      { expiresIn: "3d" }
    )}`;
    senderId = sender._id.toString();

    receiverToken = `Bearer ${require("jsonwebtoken").sign(
      { id: receiver._id },
      process.env.SECRET,
      { expiresIn: "3d" }
    )}`;
    receiverId = receiver._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should successfully create a new message", async () => {
    const newMessage = await Msg.addMessage(
      senderId,
      receiverId,
      "Hello, Receiver!"
    );
    expect(newMessage).toHaveProperty("sender", senderId);
    expect(newMessage).toHaveProperty("receiver", receiverId);
    expect(newMessage).toHaveProperty("message", "Hello, Receiver!");
    expect(newMessage).toHaveProperty("time");
  });

  it("should retrieve messages sent by a specific sender", async () => {
    await Msg.addMessage(senderId, receiverId, "Message 1");
    await Msg.addMessage(senderId, receiverId, "Message 2");

    const messages = await Msg.getMessagesBySender(senderId);
    expect(messages).toHaveLength(2);
    expect(messages[0].sender).toBe(senderId);
    expect(messages[1].sender).toBe(senderId);
  });

  it("should retrieve messages received by a specific receiver", async () => {
    await Msg.addMessage(senderId, receiverId, "Message 1");
    await Msg.addMessage(senderId, receiverId, "Message 2");

    const messages = await Msg.getMessagesByReceiver(receiverId);
    expect(messages).toHaveLength(2);
    expect(messages[0].receiver).toBe(receiverId);
    expect(messages[1].receiver).toBe(receiverId);
  });

  it("should throw an error if required fields are missing when creating a message", async () => {
    await expect(
      Msg.addMessage(null, receiverId, "Missing sender")
    ).rejects.toThrow("Sender, receiver, and message are required.");
    await expect(
      Msg.addMessage(senderId, null, "Missing receiver")
    ).rejects.toThrow("Sender, receiver, and message are required.");
    await expect(Msg.addMessage(senderId, receiverId, null)).rejects.toThrow(
      "Sender, receiver, and message are required."
    );
  });

  it("should throw an error if sender ID is missing when retrieving messages", async () => {
    await expect(Msg.getMessagesBySender(null)).rejects.toThrow(
      "Sender is required."
    );
  });

  it("should throw an error if receiver ID is missing when retrieving messages", async () => {
    await expect(Msg.getMessagesByReceiver(null)).rejects.toThrow(
      "Receiver is required."
    );
  });

  it("should delete a message by its ID", async () => {
    const newMessage = await Msg.addMessage(
      senderId,
      receiverId,
      "Message to delete"
    );
    const deletedMessage = await Msg.findByIdAndDelete(newMessage._id);

    expect(deletedMessage).toHaveProperty("message", "Message to delete");

    const remainingMessages = await Msg.getMessagesBySender(senderId);
    expect(remainingMessages).toHaveLength(0);
  });
});
