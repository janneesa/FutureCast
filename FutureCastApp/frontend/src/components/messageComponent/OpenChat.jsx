import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function OpenChat({
  selectedFriend,
  setSelectedFriend,
  messages,
  setMessages,
}) {
  const { user } = useContext(UserContext);
  const [newMessageText, setNewMessageText] = useState("");
  const [correctMessages, setCorrectMessages] = useState([]);
  const divUnderMessages = useRef();

  // Function to send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessageText === "") {
      return;
    }
    const message = {
      sender: user.username,
      receiver: selectedFriend.username,
      message: newMessageText,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        setNewMessageText("");
        setMessages((prev) => [...prev, message]);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("message send error:", error);
    }
  };

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

  return (
    <div className="card flex flex-col p-4 h-[calc(100vh-8rem)] w-full md:w-full">
      {Object.keys(selectedFriend).length !== 0 && (
        <div className="flex flex-row">
          <button className="text-primaryText dark:text-darkPrimaryText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer flex items-center m-2"
              onClick={() => setSelectedFriend({})}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <img
            src={selectedFriend.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full m-2"
          />
          <h4 className="ml-2 w-full flex items-center">
            {selectedFriend.name}
          </h4>
        </div>
      )}
      <div className="card flex-grow p-2">
        {Object.keys(selectedFriend).length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-gray-400">&larr; Select a person</div>
          </div>
        )}
        {Object.keys(selectedFriend).length !== 0 && (
          <div className="relative h-full">
            <div className="flex flex-col h-full overflow-y-auto absolute top-0 left-0 right-0 bottom-2">
              {correctMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-1 w-3/4 mr-2 mt-2 ${
                    msg.sender === user.username
                      ? "items-end self-end"
                      : "items-start self-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-full break-words ${
                      msg.sender === user.username
                        ? "bg-primaryButton text-white"
                        : "bg-gray-200 dark:bg-dark-400"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div
                    className={`text-xs text-gray-400 ${
                      msg.sender === user.username ? "text-right" : ""
                    }`}
                  >
                    {msg.sender}
                  </div>
                </div>
              ))}
              <div ref={divUnderMessages}></div>
            </div>
          </div>
        )}
      </div>
      {Object.keys(selectedFriend).length !== 0 && (
        <form className="flex gap-2 p-2" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Type a message..."
            className="input flex-grow"
          />
          <button
            type="submit"
            className="p-2 bg-primaryButton text-darkPrimaryText rounded hover:bg-primaryButton/90 transition text-center dark:bg-darkPrimaryButton dark:hover:bg-darkPrimaryButton/90;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
export default OpenChat;
