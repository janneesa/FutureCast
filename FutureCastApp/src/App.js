const connectDB = require("./backend/config/db");
const express = require("express");
const app = express();
const userRouter = require("./backend/routes/userRouter");

connectDB();

app.use(express.json()); // middleware to parse JSON bodies

app.get("/", (req, res) => res.send("API Running!"));

// Routes
app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
