# Self-Assessment of Code

## Samuel Puhakka

### predController.js

- **Error Handling**: Implements robust error handling for invalid input and database operations, ensuring meaningful responses for clients.
- **Validation**: Validates MongoDB ObjectIDs before performing any operations, reducing unnecessary database queries.
- **Reusable Methods**: Separates CRUD logic into reusable and scalable methods for better maintainability.
- **Standardized Responses**: Returns consistent HTTP status codes (`200`, `400`, `404`, `500`) with descriptive messages.

```js
const getPredictionByUsername = async (req, res) => {
  const { username } = req.params; // Extract username from request parameters

  // Validate that a username is provided
  if (!username) {
    return res.status(400).json({ message: "Invalid username" });
  }

  try {
    // Query the database for a prediction by username
    const prediction = await Prediction.findOne({ username });

    // Check if a prediction was found and return appropriate response
    if (prediction) {
      res.status(200).json(prediction);
    } else {
      res.status(404).json({ message: "Prediction not found" });
    }
  } catch (error) {
    // Handle server-side errors
    res.status(500).json({ message: "Failed to retrieve prediction" });
  }
};
```

---

### predModel.js 

- **Schema Organization**: The schema design is modular and clearly defines required and optional fields for flexibility. 
- **Array and Date Handling**: Uses arrays for `agrees` and `disagrees` fields, and timestamps for `createdAt` and `updatedAt` to support real-time features.
- **Default Values**: Ensures stability by providing default values where necessary.

```js
const predSchema = new Schema(
  {
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    prediction: { type: String, required: true },
    agrees: { type: [String], required: true },
    disagrees: { type: [String], required: true },
    comments: { type: Number, required: true },
    lastVoteDate: { type: Date, required: true },
    avatar: { type: String, required: false },
  },
  { timestamps: true }
);
```

---

### predRoutes.js 

- **RESTful Routing**: Adheres to RESTful principles, with routes that clearly map to CRUD operations.
- **Route Modularity**: Encapsulates all routes in a single module for easy integration and maintainability.
- **Future Expansion**: Includes commented-out code (`PATCH` route) for anticipated enhancements.

```js
// Define routes
router.get("/", getAllPredictions);
router.post("/", createPrediction);
router.get("/:predictionId", getPredictionById);
router.get("/username/:username", getPredictionByUsername);
router.put("/:predictionId", updatePrediction);
router.delete("/:predictionId", deletePrediction);
```

---

### Next steps

**Improvements**
- **Error Middleware**: Add centralized error-handling middleware to streamline response management.
- **Authentication**: Secure routes with authentication middleware to link predictions to specific users.

**Functionality**
- **Bridge between**: Add a bridge between frontend and the database.
---