const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../App"); // Your Express app
const Comment = require("../models/commModel");

const api = supertest(app);

describe("Comment API", () => {
  let testCommentId = "";

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
    const comment = await Comment.create({
      userId: "12345",
      username: "testuser",
      comment: "This is a test comment.",
      likes: [],
    });
    testCommentId = comment._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /comments", () => {
    it("should fetch all comments", async () => {
      const response = await api.get("/api/comments").expect(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].comment).toBe("This is a test comment.");
    });
  });

  describe("POST /comments", () => {
    it("should create a new comment", async () => {
      const newComment = {
        userId: "67890",
        username: "newuser",
        comment: "A new test comment.",
        likes: [],
      };

      const response = await api
        .post("/api/comments")
        .send(newComment)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body.comment).toBe("A new test comment.");
      const commentsInDb = await Comment.find({});
      expect(commentsInDb).toHaveLength(2);
    });

    it("should fail if required fields are missing", async () => {
      const incompleteComment = { userId: "67890" };

      const response = await api
        .post("/api/comments")
        .send(incompleteComment)
        .expect(400);

      expect(response.body.message).toContain("Failed to create comment");
    });
  });

  describe("GET /comments/:commentId", () => {
    it("should fetch a comment by ID", async () => {
      const response = await api
        .get(`/api/comments/${testCommentId}`)
        .expect(200);
      expect(response.body.comment).toBe("This is a test comment.");
    });

    it("should return 400 for an invalid comment ID", async () => {
      const response = await api.get("/api/comments/invalidId").expect(400);
      expect(response.body.message).toBe("Invalid comment ID");
    });

    it("should return 404 for a non-existent comment", async () => {
      const response = await api
        .get(`/api/comments/${new mongoose.Types.ObjectId()}`)
        .expect(404);
      expect(response.body.message).toBe("Comment not found");
    });
  });

  describe("GET /comments/username/:username", () => {
    it("should fetch a comment by username", async () => {
      const response = await api
        .get("/api/comments/username/testuser")
        .expect(200);
      expect(response.body.comment).toBe("This is a test comment.");
    });

    it("should return 404 for a non-existent username", async () => {
      const response = await api
        .get("/api/comments/username/nonexistentuser")
        .expect(404);
      expect(response.body.message).toBe("Comment not found");
    });
  });

  describe("PUT /comments/:commentId", () => {
    it("should update a comment successfully", async () => {
      const updatedData = { comment: "Updated comment text." };

      const response = await api
        .put(`/api/comments/${testCommentId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.comment).toBe(updatedData.comment);
    });

    it("should return 400 for an invalid comment ID", async () => {
      const response = await api
        .put("/api/comments/invalidId")
        .send({ comment: "Updated comment" })
        .expect(400);

      expect(response.body.message).toBe("Invalid comment ID");
    });
  });

  describe("PUT /comments/:commentId/like", () => {
    it("should like and unlike a comment", async () => {
      const userId = "67890";

      // Like the comment
      let response = await api
        .put(`/api/comments/${testCommentId}/like`)
        .send({ userId })
        .expect(200);
      expect(response.body.likes).toContain(userId);

      // Unlike the comment
      response = await api
        .put(`/api/comments/${testCommentId}/like`)
        .send({ userId })
        .expect(200);
      expect(response.body.likes).not.toContain(userId);
    });
  });

  describe("DELETE /comments/:commentId", () => {
    it("should delete a comment successfully", async () => {
      const response = await api
        .delete(`/api/comments/${testCommentId}`)
        .expect(200);

      expect(response.body._id).toBe(testCommentId);

      const commentsInDb = await Comment.find({});
      expect(commentsInDb).toHaveLength(0);
    });

    it("should return 400 for an invalid comment ID", async () => {
      const response = await api.delete("/api/comments/invalidId").expect(400);
      expect(response.body.message).toBe("Invalid comment ID");
    });
  });
});
