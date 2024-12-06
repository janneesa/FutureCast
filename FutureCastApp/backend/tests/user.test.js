const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app"); // Your Express app
const User = require("../models/userModel");

const api = supertest(app);

describe("User Authentication for Auth", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("User Signup", () => {
    it("should register a new user successfully", async () => {
      const newUser = {
        name: "Testi Mies",
        email: "testaaja@example.com",
        username: "testaaja",
        password: "password",
        phone_number: "555-555-5555",
        date_of_birth: "1990-01-01",
        bio: "",
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
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body.message).toBe("User created successfully");

      const userInDb = await User.findOne({ username: newUser.username });
      expect(userInDb).not.toBeNull();
    });

    it("should not register a user with missing fields", async () => {
      const incompleteUser = {
        username: "johndoe",
        password: "password123",
      };

      const response = await api
        .post("/api/users")
        .send(incompleteUser)
        .expect(400);

      expect(response.body.error).toBe("All fields must be filled");
    });

    it("should not register a user with a duplicate username or email", async () => {
      const user = {
        name: "Testi Mies",
        email: "testaaja@example.com",
        username: "testaaja",
        password: "password",
        phone_number: "555-555-5555",
        date_of_birth: "1990-01-01",
        bio: "",
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
      };

      await User.create(user);

      const response = await api.post("/api/users").send(user).expect(400);

      expect(response.body.error).toBe(
        'Duplicate key error. E11000 duplicate key error collection: futurecast.users index: email_1 dup key: { email: "testaaja@example.com" }'
      );
    });
  });

  describe("User Login", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await User.create({
        name: "Testi Mies",
        email: "testaaja@example.com",
        username: "testaaja",
        password: hashedPassword,
        phone_number: "555-555-5555",
        date_of_birth: "1990-01-01",
        bio: "",
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
    });

    it("should login a user successfully with valid credentials", async () => {
      const loginData = {
        email: "testaaja@example.com",
        password: "password123",
      };

      const response = await api
        .post("/api/users/login")
        .send(loginData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.username).toBe(loginData.username);
      expect(response.body.token).toBeDefined();
    });

    it("should not login with invalid password", async () => {
      const loginData = {
        email: "testaaja@example.com",
        password: "wrongpassword",
      };

      const response = await api
        .post("/api/users/login")
        .send(loginData)
        .expect(400);

      expect(response.body.error).toBe("Incorrect password");
    });

    it("should not login with non-existent email", async () => {
      const loginData = {
        email: "nonexistentemail@email.com",
        password: "password123",
      };

      const response = await api
        .post("/api/users/login")
        .send(loginData)
        .expect(400);

      expect(response.body.error).toBe("Incorrect email");
    });
  });
});
