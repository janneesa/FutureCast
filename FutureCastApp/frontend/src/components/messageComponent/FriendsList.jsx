import React, { useState, useContext } from "react";
import { useEffect } from "react";

const API_URL = "http://localhost:4000/api/";

function FriendsList() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    const handleSearch = () => {
        navigate("/app/search", { state: { searchWord } });
    };

    //Doesnt work yet
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        fetchMessages("Roni"); // Hardcoded for now, should be user's own username
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            fetchFriends(messages);
          }
    }, [messages]);

    const fetchMessages = async (senderId) => {
        try {
            const response = await fetch(`${API_URL}messages/sender/${senderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const message = await response.json();
                setMessages(...messages, message);
            } else {
                throw new Error("Failed to fetch messages");
            }
        } catch (error) {
            console.error("messages fetch error:", error);
        }
    }

    const fetchFriends = async (messages) => {
        try {
            for (let i = 0; i < messages.length; i++) {     
                const response = await fetch(`${API_URL}users/username/${messages[i].receiver}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (response.ok) {
                    const friend = await response.json();
                    if (!friends.includes(friend)) {
                        setFriends([...friends, friend]);
                    }
            } else {
                throw new Error("Failed to fetch friends");
            }}
        } catch (error) {
            console.error("Friends fetch error:", error);
        }
    }

    return (
        <div className="card h-full p-2">
            <div>
                <h2 className="card-header">Messages</h2>
                <div className="hidden lg:flex p-2">
                    <input
                    type="text"
                    placeholder="Search users..."
                    className="input flex-grow"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    ></input>
                    <div className="ml-2">
                    <button className="button" onClick={handleSearch}>
                        Search
                    </button>
                    </div>
                </div>      
            </div>
            <h3 className="card-header">Your conversations</h3>
            <div className="card">
                <ul className="max-h-[calc(100vh-20rem)] overflow-y-auto">
                    {friends.map((friend) => (
                        <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500" key={friend.username}>
                            <img
                                src={friend.avatar}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-2">
                                <h4 className="font-semibold">{friend.username}</h4>
                                <p className="text-sm">Last message</p>
                            </div>
                        </li>
                    ))}
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 2</h4>
                            <p className="text-sm">Last message</p>
                        </div>
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 3</h4>
                            <p className="text-sm">Last message</p>
                        </div>
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 4</h4>
                            <p className="text-sm">Last message</p>
                        </div>
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 5</h4>
                            <p className="text-sm">Last message</p>
                        </div>
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 6</h4>
                            <p className="text-sm">Last message</p>
                        </div>
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 7</h4>
                            <p className="text-sm">Last message</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;