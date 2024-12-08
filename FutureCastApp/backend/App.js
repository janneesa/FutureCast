require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const predRouter = require("./routes/predRouter");
const commRouter = require("./routes/commRouter");
const msgRouter = require("./routes/msgRouter");
const {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} = require("./middlewares/customMiddleware");
const path = require("path");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Use the requestLogger middleware
app.use(requestLogger);

// Routes
// Use the userRouter for all routes starting with /api/users
app.use("/api/users", userRouter);
// Use the predRouter for all routes starting with /api/predictions
app.use("/api/predictions", predRouter);
// Use the commRouter for all routes starting with /api/comments
app.use("/api/comments", commRouter);
// Use the msgRouter for all routes starting with /api/messages
app.use("/api/messages", msgRouter);

// Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Middleware to handle unknown endpoints and errors
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

// const port = process.env.PORT || 4000;
// app.listen(port, () =>
//   console.log(`Server is running on http://localhost:${port}`)
// );
