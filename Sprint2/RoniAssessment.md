# Self-Assessment of Code

## Roni Ström


### getUserByUsername -function

This is the original function that gets the user from the database searching by it's username. 

```js
// userController.js
// GET /users/:username
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  if (!username) {
      return res.status(400).json({ message: "Invalid username" });
  }

  try {
    const user = await User.findOne({username});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
  catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};
```

The next one is the code that LLM modified. The LLM added a feature that excludes the password from the search. This makes it safer. Although in some cases the password might be neccessary. It also added a console.log, added comments and modified the if-statement structure. 

```js
// GET /users/:username
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Validate input
    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    // Query the database with field projection
    const user = await User.findOne({ username }).select("-password"); // Exclude sensitive fields like 'password'

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Respond with user data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(`Error retrieving user: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

```

### userModel.js -file

This is the original `userModel.js` file. It creates a schema for the MongoDB database. 

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    followers: {
      type: [String],
      required: false,
    },
    following: {
      type: [String],
      required: false,
    },
    predictions: {
      type: [String],
      required: false,
    },
    successfulPredictions: {
      type: [String],
      required: false,
    },
    predictionScore: {
      type: Number,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

```

The next one is the version that LLM modified. It added validators to check if the email addesses and phone numbers are correct. This won't be neccessary since the front-end will likely do this instead. 

It also made some variables like `followers` into objects. This might be handy, although originally the value was supposed to be user's id. 

The LLM also added middleware for hashing passwords to make the connection safer. 

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude password by default when querying
    },
    phone_number: {
      type: String,
      required: false,
      match: [/^\+?\d{7,15}$/, "Invalid phone number format"], // Optional validation
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: false,
      trim: true,
      maxlength: 300, // Limit bio length
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference User model
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference User model
      default: [],
    },
    predictions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prediction" }], // Reference Prediction model
      default: [],
    },
    successfulPredictions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prediction" }], // Reference Prediction model
      default: [],
    },
    predictionScore: {
      type: Number,
      required: false,
      default: 0, // Initialize prediction score
    },
    avatar: {
      type: String,
      required: false,
      default: "default-avatar.png", // Use a default avatar image
    },
  },
  { timestamps: true }
);

// Middleware for hashing passwords before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const bcrypt = require("bcryptjs");
  this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
  next();
});

// Exclude sensitive fields in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);

```
