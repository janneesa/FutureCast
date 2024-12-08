const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../App");
const User = require("../models/userModel");
const Prediction = require("../models/predModel");
const Comment = require("../models/commModel");

const api = supertest(app);

describe("Prediction API Tests", () => {
  let predictionId = "";
  let validToken = "";
  let existingUserId = "";

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    // Clear collections
    await User.deleteMany({});
    await Prediction.deleteMany({});
    await Comment.deleteMany({});

    // Create a test user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
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

    // Generate token
    validToken = `Bearer ${jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "3d",
    })}`;
    existingUserId = user._id.toString();

    // Create a test prediction
    const prediction = await Prediction.create({
      userId: existingUserId,
      username: "testuser",
      prediction: "The stock market will rise by 10% in Q4.",
      agrees: [],
      disagrees: [],
      comments: [],
      lastVoteDate: new Date(),
      avatar: "https://example.com/avatar.jpg",
      category: "Finance",
    });

    predictionId = prediction._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /predictions", () => {
    it("should retrieve all predictions", async () => {
      const response = await api.get("/api/predictions").expect(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].prediction).toBe(
        "The stock market will rise by 10% in Q4."
      );
    });
  });

  describe("POST /predictions", () => {
    it("should create a new prediction", async () => {
      const newPrediction = {
        userId: existingUserId,
        username: "testuser",
        prediction: "AI will surpass human intelligence by 2040.",
        agrees: [],
        disagrees: [],
        lastVoteDate: new Date(),
        category: "Technology",
      };

      const response = await api
        .post("/api/predictions")
        .set("Authorization", validToken)
        .send(newPrediction)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body.prediction).toBe(
        "AI will surpass human intelligence by 2040."
      );

      const allPredictions = await Prediction.find({});
      expect(allPredictions).toHaveLength(2);
    });
  });

  describe("PUT /predictions/:predictionId", () => {
    it("should update an existing prediction", async () => {
      const updateData = { prediction: "Updated prediction text" };
      const response = await api
        .put(`/api/predictions/${predictionId}`)
        .set("Authorization", validToken)
        .send(updateData)
        .expect(200);
      expect(response.body.prediction).toBe("Updated prediction text");
    });
  });

  describe("DELETE /predictions/:predictionId", () => {
    it("should delete a prediction", async () => {
      const response = await api
        .delete(`/api/predictions/${predictionId}`)
        .set("Authorization", validToken)
        .expect(200);
    });
  });

  describe("POST /predictions/:predictionId/comments", () => {
    it("should add a comment to a prediction", async () => {
      const newComment = {
        userId: existingUserId,
        username: "testuser",
        comment: "This is a comment",
      };

      const response = await api
        .post(`/api/predictions/${predictionId}/comments`)
        .set("Authorization", validToken)
        .send(newComment)
        .expect(200);
      expect(response.body.comment).toBe("This is a comment");
    });
  });

  describe("PUT /predictions/:predictionId/vote", () => {
    it("should allow a user to vote", async () => {
      const voteData = { userId: existingUserId, voteType: "agrees" };
      const response = await api
        .put(`/api/predictions/${predictionId}/vote`)
        .set("Authorization", validToken)
        .send(voteData)
        .expect(200);
      expect(response.body.agrees).toContain(existingUserId);
    });
  });
});
