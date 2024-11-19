require("dotenv").config();
const connectDB = require("./backend/config/db");
const express = require("express");
const app = express();
const userRouter = require("./backend/routes/userRouter");
const predRouter = require("./backend/routes/predRouter");

connectDB();

app.use(express.json()); // middleware to parse JSON bodies

app.get("/", (req, res) => res.send("API Running!"));

// Routes
// Use the userRouter for all routes starting with /api/users
app.use("/api/users", userRouter);
// Use the predRouter for all routes starting with /api/predictions
app.use("/api/predictions", predRouter);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
