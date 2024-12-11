# Self-Assessment of Code

## Roni Ström

### My contribution

In this sprint I was mainly in charge of direct messaging between users. I also did a little changes to the code elsewhere on top of that. I worked on both front- and back-end. 

### fetchMessages()

This function fetches all messages that the current logged in user has either sended or recieved. The function contains two fetches and both of them use JWT-token to verify the fetch. All fetch results are added to `messages` state variable array and sorted by the date. 

This could have been improved by creating a custom hook to handle the fetching. The code would have been shorter and cleaner. Also, backend could have been modified so this type of fetch could be made with only one fetch. LLM also pointed out that this could have been made by just putting another variable in the URL (sender/receiver). 

```js
// ../frontend/src/components/messageComponent/FriendsList.jsx
// Fetch all messages for the logged in user
    const fetchMessages = async (username) => {
        const fetchedMessages = new Set();

        // Fetch messages where the user is the sender
        try {
            const response = await fetch(`/api/messages/sender/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const messages = await response.json();
                messages.forEach(msg => fetchedMessages.add(msg));
            } else {
                throw new Error("Failed to fetch sended messages");
            }
        } catch (error) {
            console.error("messages fetch error:", error);
        }

        //Fetch messages where user is the receiver
        try {
            const response = await fetch(`/api/messages/receiver/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const messages = await response.json();
                messages.forEach(msg => fetchedMessages.add(msg));
            } else {
                throw new Error("Failed to fetch received messages");
            }
        } catch (error) {
            console.error("messages fetch error:", error);
        }

        setMessages(Array.from(fetchedMessages).sort((a, b) => new Date(b.time) - new Date(a.time)));
    }
```

### Two `useEffect()`s

The first `useEffect()` pulls the correct messages from `messages` array when the user chooses another friend to message to or when a new message is added. Correct user in this case means the friend whose chat the user chooses to open. It also makes sure that the messages are in the correct order. LLM would remove the extra variable `correctMessages` or name it to something more descriptive. 

The second `useEffect()` makes sure that the chat window is scrolled down when the user selects a new friend or when a new message appears to the selected chat (either written by the user or by the friend). LLM would add extra check to make sure that `divUnderMessages` is defined and remove `correctMessages` from the square brackets. 

```js
// ../frontend/src/components/messageComponent/OpenChat.jsx
  // Fetch messages when conversation changes
  useEffect(() => {
    setCorrectMessages([]);
    if (selectedFriend) {
      const correctMessages = messages
        .filter(
          (msg) =>
            msg.sender === selectedFriend.username ||
            msg.receiver === selectedFriend.username
        )
        .sort((a, b) => new Date(a.time) - new Date(b.time));
      setCorrectMessages(correctMessages);
    }
  }, [selectedFriend, messages]);

  // Scroll to the bottom of the messages
  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [selectedFriend, correctMessages]);
```

### `addMessage()` & `getMessageBySender()` in the model

Here are two simple functions from the backend `msgModel.js` that use the Mongoose supported statics function. 

The first one creates a new message to the database. It makes sure that all fields are filled and adds a time to the fourth spot in the schema. LLM would modify this by making sure that the message is not too long (now there is no limit) and relying on timestamps that are added automatically instead of adding time manually.

The second one gets the message with senders username. It also makes sure that the parameter is not empty and sorts the messages by time (again, just to make sure). It has proper error handling. LLM would return an empty array instead of error since an empty array won't cause any exceptions. Although this makes debugging more difficult. Also it would add validation for the username to make sure the user actually exists. 

```js
// ../backend/models/msgModel.js
//new messages
msgSchema.statics.addMessage = async function (sender, receiver, message) {
    if (!sender || !receiver || !message) {
        throw new Error("Sender, receiver, and message are required.");
    }
    
    const msg = await this.create({
        sender,
        receiver,
        message,
        time: new Date(),
    });
    return msg;
};

//get by senderId
msgSchema.statics.getMessagesBySender = async function (sender) {
    if (!sender) {
        throw new Error("Sender is required.");
    }
    const messages = await this.find({ sender }).sort({ time: -1 });
    if (!messages) {
        throw new Error("Messages not found.");
    }
    return messages;
};
```