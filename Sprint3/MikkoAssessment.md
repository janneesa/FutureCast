# Self-Assessment of Code

## Mikko Saarela

Here's a look at the some of theh work I put in to our project during the last sprint. I share some insights into frontend and backend solutions.

In this sprint, I contributed to both the frontend and backend of our project. While I made meaningful progress, I recognize areas where improvements are needed, such as reducing code duplication and better utilizing team-shared resources (like customh hooks). Time constraints and personal challenges limited my ability to address these issues fully, but I prioritized critical improvements and functionality. My goal was to fix some issues during the last few days, but I got caught up finishing the last improvements and on top it, I was bit unwell as well which meant I had to prioritize and leave somethings undone.

### predController.jsx

One major hurdle was implementing a backend solution to retrieve predictions with lastVoteDate values in the past. This required using the Date object and the $lt operator effectively. The following code snippet demonstrates my approach:

```js
// GET /predictions/past
const getPastPredictions = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const pastPredictions = await Prediction.find({
      lastVoteDate: { $lt: currentDate },
    }).populate('comments');
    res.status(200).json(pastPredictions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve past predictions' });
  }
};
```

One of the first problems I remember encountering was not remembering to use the populate method with comments. This step is essential because comments are stored as references (ObjectId) in the predModel schema:

```js
comments: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
];
```

Fetching and populating these comments enables the application to retrieve the full comment data in one query, avoiding inefficiencies caused by multiple database calls. Debugging these issues significantly improved my understanding of how MongoDB works.

Adding new comments to predictions posed another challenge. Here’s the backend logic I implemented for this functionality:

```js
try {
  const newComment = await Comment.create({
    userId: userId.toString(),
    username,
    comment,
    likes: [],
  });

  const prediction = await Prediction.findByIdAndUpdate(
    predictionId,
    {
      $push: { comments: newComment._id },
    },
    { new: true }
  ).populate('comments');

  if (!prediction) {
    return res.status(404).json({ message: 'Prediction not found' });
  }

  res.status(200).json(newComment);
} catch (error) {
  console.error('Error adding comment:', error);
  res.status(500).json({
    message: 'Failed to add comment',
    error: error.message,
  });
}
```

The most time-consuming aspect was debugging, especially when backend errors weren’t immediately clear. Thorough logging and methodical testing helped identify and resolve issues.

Suggestions for Improvement:

- Error Handling: Include detailed error messages and explore retry mechanisms for transient issues.
- Code Reusability: Abstract shared database operations into helper functions to reduce redundancy.
- Performance: Use database indexes to speed up query performance for fields like lastVoteDate and comments.

### CommentModal.jsx, commController.js

The comment liking functionality uses an array to store user IDs. The backend checks if the user’s ID exists in the array to toggle their like status, ensuring the same button works for both adding and removing likes:

```js
// PUT /comments/:commentId/like
const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likeIndex = comment.likes.indexOf(userId);
    if (likeIndex > -1) {
      comment.likes.splice(likeIndex, 1);
    } else {
      comment.likes.push(userId);
    }

    comment.markModified('likes');
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error in likeComment:', error);
    res.status(500).json({ message: 'Failed to like comment' });
  }
};
```

The frontend sends the toggle request and updates the local state based on the response:

```js
const handleLike = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/comments/${commentId}/like`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to like comment');
    }

    const updatedComment = await response.json();

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? updatedComment : comment
      )
    );
  } catch (error) {
    console.error('Error liking comment:', error);
  }
};
```

Suggestions for Improvement:

- Error Handling: Standardize error responses for better debugging and user experience.
- Code Simplification: Refactor shared logic into reusable utility functions.

### Prediction.jsx, predController.jsx

To streamline voting on predictions, the frontend manages a local state for the user's vote. The backend processes vote data to update the appropriate arrays (agrees or disagrees):

```js
const response = await fetch(`/api/predictions/${id}/vote`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${user.token}`,
  },
  body: JSON.stringify({
    userId: user.id,
    voteType: userVote === type ? null : type,
  }),
});
```

The controller function for voting first checks that we have a valid ID, finds the prediction and then filters out the users vote from both agrees and disagrees arrays. It then adds the user vote depending on the type to the correct array.

If the user vote is the same as the old vote, the frontend has sent a null and nothing is added to either array.

```js
const votePrediction = async (req, res) => {
  const { predictionId } = req.params;
  const { userId, voteType } = req.body;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: 'Invalid prediction ID' });
  }

  try {
    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return res.status(404).json({ message: 'Prediction not found' });
    }

    prediction.agrees = prediction.agrees.filter(
      (id) => String(id) !== String(userId)
    );
    prediction.disagrees = prediction.disagrees.filter(
      (id) => String(id) !== String(userId)
    );

    if (voteType === 'agrees') {
      prediction.agrees = prediction.agrees.concat([userId]);
    } else if (voteType === 'disagrees') {
      prediction.disagrees = prediction.disagrees.concat([userId]);
    }

    prediction.markModified('agrees');
    prediction.markModified('disagrees');

    const savedPrediction = await prediction.save();
    res.status(200).json(savedPrediction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to vote on prediction' });
  }
};
```

Suggestions for Improvement:

- Performance: Optimize the filtering and concatenation logic for large arrays.
- Code Maintainability: Use middleware or service layers for reusable database operations.
