require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/userModel");

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mock data
const mockUsers = [
  {
    name: "John Doe",
    email: "m@example.com",
    username: "johndoe",
    password: "password",
    phonenumber: "123-456-7890",
    date_of_birth: "1990-05-15",
    bio: "Tech enthusiast and prediction lover. Always curious about the future!",
    followers: [],
    following: [],
    predictions: [],
    successfulPredictions: [],
    predictionScore: 75,
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    settings: {
      notifications: {
        email: true,
        push: true,
      },
      preferences: {
        darkMode: true,
      },
    },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    username: "janesmith",
    password: "password",
    phonenumber: "987-654-3210",
    date_of_birth: "1985-10-20",
    bio: "Avid reader and writer. Passionate about technology and innovation.",
    followers: [],
    following: [],
    predictions: [],
    successfulPredictions: [],
    predictionScore: 85,
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    settings: {
      notifications: {
        email: true,
        push: false,
      },
      preferences: {
        darkMode: false,
      },
    },
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    // Insert mock data
    await User.insertMany(mockUsers);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
