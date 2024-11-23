require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const predRouter = require("./routes/predRouter");
const commRouter = require("./routes/commRouter");

connectDB();

app.use(express.json()); // middleware to parse JSON bodies

app.get("/", (req, res) => res.send("FutureCast API Running!"));

// Routes
// Use the userRouter for all routes starting with /api/users
app.use("/api/users", userRouter);
// Use the predRouter for all routes starting with /api/predictions
app.use("/api/predictions", predRouter);
// Use the commRouter for all routes starting with /api/comments
app.use("/api/comments", commRouter);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
