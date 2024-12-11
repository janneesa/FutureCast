const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../App"); // Your Express app
const User = require("../models/userModel");

const api = supertest(app);

describe("User Authentication and Management", () => {
  let validToken = "";
  let existingUserId = "";

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});

    // Create a user and generate a valid token for tests
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

    validToken = `Bearer ${require("jsonwebtoken").sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: "3d" }
    )}`;
    existingUserId = user._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("User Signup", () => {
    it("should register a new user successfully", async () => {
      const newUser = {
        name: "New User",
        email: "newuser@example.com",
        username: "newuser",
        password: "password123",
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
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const userInDb = await User.findOne({ email: newUser.email });
      expect(userInDb).not.toBeNull();
    });

    it("should not register a user with missing fields", async () => {
      const incompleteUser = {
        username: "incompleteuser",
        password: "password123",
      };

      const response = await api
        .post("/api/users")
        .send(incompleteUser)
        .expect(400);

      expect(response.body.error).toBe("All fields must be filled");
    });

    it("should not register a user with invalid email format", async () => {
      const newUser = {
        name: "Test User",
        email: "invalidemail",
        username: "testuser",
        password: "password123",
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
      };

      const response = await api.post("/api/users").send(newUser).expect(400);

      expect(response.body.error).toContain("Email not valid");
    });

    it("should not register a user with a duplicate username or email", async () => {
      const duplicateUser = {
        name: "Test User",
        email: "newuser@example.com",
        username: "testuser",
        password: "password123",
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
      };

      const response = await api
        .post("/api/users")
        .send(duplicateUser)
        .expect(400);

      expect(response.body.error).toContain(
        "username with value 'testuser' already exists."
      );
    });
  });

  describe("User Login", () => {
    it("should login successfully with valid credentials", async () => {
      const loginData = {
        email: "testuser@example.com",
        password: "password123",
      };

      const response = await api
        .post("/api/users/login")
        .send(loginData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.user.username).toBe("testuser");
      expect(response.body.token).toBeDefined();
    });

    it("should not login with an invalid password", async () => {
      const loginData = {
        email: "testuser@example.com",
        password: "wrongpassword",
      };

      const response = await api
        .post("/api/users/login")
        .send(loginData)
        .expect(400);

      expect(response.body.error).toBe("Incorrect password");
    });

    it("should not login with a non-existent email", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const response = await api
        .post("/api/users/login")
        .send(loginData)
        .expect(400);

      expect(response.body.error).toBe("Incorrect email");
    });
  });

  describe("User Update", () => {
    it("should update user details successfully", async () => {
      const updatedData = { name: "Updated Name", bio: "Updated Bio" };

      const response = await api
        .put(`/api/users/${existingUserId}`)
        .set("Authorization", validToken)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.bio).toBe(updatedData.bio);
    });

    it("should not update with invalid user ID", async () => {
      const response = await api
        .put("/api/users/invalidId")
        .set("Authorization", validToken)
        .send({ name: "Updated Name" })
        .expect(400);

      expect(response.body.message).toBe("Invalid user ID");
    });

    it("should not update without authorization", async () => {
      const updatedData = { name: "Updated Name" };

      const response = await api
        .put(`/api/users/${existingUserId}`)
        .send(updatedData)
        .expect(401);

      expect(response.body.error).toBe("Authorization token required");
    });
  });

  describe("User Deletion", () => {
    it("should delete a user successfully", async () => {
      const response = await api
        .delete(`/api/users/${existingUserId}`)
        .set("Authorization", validToken)
        .expect(200);

      expect(response.body.message).toBe("User deleted successfully");

      const userInDb = await User.findById(existingUserId);
      expect(userInDb).toBeNull();
    });

    it("should not delete with an invalid user ID", async () => {
      const response = await api
        .delete("/api/users/invalidId")
        .set("Authorization", validToken)
        .expect(400);

      expect(response.body.message).toBe("Invalid user ID");
    });
  });
});
