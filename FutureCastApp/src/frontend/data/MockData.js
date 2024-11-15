const user = {
  id: 1,
  name: "John Doe",
  username: "@johndoe",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  followers: [2, 3, 4, 5, 6],
  following: [2, 3],
  totalPredictions: 2,
  predictionScore: 50,
  successfulPredictions: 1,
  avatar:
    "https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b",
};

const predictions = [
  {
    id: 1,
    userId: 1,
    user: "johndoe",
    avatar: "../../../assets/react.svg",
    prediction:
      "By 2025, renewable energy will account for 50% of global electricity production.",
    agrees: 120,
    disagrees: 30,
    comments: 15,
    lastVoteDate: "2024-12-31",
  },
  {
    id: 2,
    userId: 1,
    user: "johndoe",
    avatar: "../../../assets/react.svg",
    prediction:
      "By 2030, the world will have 1 billion electric vehicles on the road.",
    agrees: 100,
    disagrees: 50,
    comments: 10,
    lastVoteDate: "2029-12-31",
  },
  {
    id: 3,
    userId: 2,
    user: "bradtraversy",
    avatar: "../../../assets/react.svg",
    prediction: "By 2035, the first human will set foot on Mars.",
    agrees: 80,
    disagrees: 70,
    comments: 5,
    lastVoteDate: "2034-12-31",
  },
];

export const mockData = {
  user,
  predictions,
};
