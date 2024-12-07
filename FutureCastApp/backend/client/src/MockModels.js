const user = {
  // Id comes from mongo db
  id: 1,
  name: "Firstname Lastname",
  email: "email",
  username: "username",
  password: "password",
  phonenumber: "123-456-7890",
  dateOfBirth: "2000-01-01",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  // List of user ids
  followers: [2, 3, 4, 5, 6],
  // List of user ids
  following: [2, 3],
  // List of prediction ids
  predictions: [1, 2],
  // List of successful prediction ids
  successfulPredictions: [1],
  predictionScore: 50,
  avatar:
    "https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b",
  settings: {
    notifications: {
      email: true,
      push: true,
    },
    preferences: {
      darkMode: true,
    },
  },

  // METHODS
  // GET All
  // GET By Id
  // DELETE
  // PUT (update)

  // GET By Username
};

const predictions = {
  // Id comes from mongo db
  id: 1,
  // Id of the user who made the prediction
  userId: 1,
  // Username of the user who made the prediction
  username: "username",
  prediction:
    "By 2025, renewable energy will account for 50% of global electricity production.",
  // List of user ids who agree with the prediction
  agrees: [1, 2, 3, 4, 5],
  // List of user ids who disagree with the prediction
  disagrees: [6, 7, 8, 9],
  comments: [
    {
      id: 1,
      username: "username",
      userId: 4,
      comment: "I think this is very likely.",
      likes: [1, 2],
    },
  ],
  lastVoteDate: "2024-12-31",
  avatar:
    "https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b",

  // METHODS
  // GET All
  // GET By Id
  // POST
  // PUT (update)

  // GET By UserId
  // GET Popular (10-20 predictions with the most votes)
  // GET Recent (10-20 most recent predictions)
};

export const mockData = {
  user,
  prediction,
};


//messages
const messages = {
  id: 1,
  senderId: 1,
  receiverId: 2,
  message: "Hello!",
  date: "2022-01-01"
};

//get by senderId
//get by receiverId
//order by time