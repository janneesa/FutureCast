import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/api/";

function FriendsList({ selectedFriend, setSelectedFriend, messages, setMessages }) {
    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/app/search", { state: { searchWord } });
    };

    useEffect(() => {
        fetchMessages(user.username);
    }, [user]);

    useEffect(() => {
        if (messages.length > 0) {
            fetchFriends(messages);
        }
    }, [messages]);

    const fetchMessages = async (username) => {
        const fetchedMessages = new Set();

        // Fetch messages FROM the logged in user
        try {
            const response = await fetch(`${API_URL}messages/sender/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

        //Fetch messages where user is receiver
        try {
            const response = await fetch(`${API_URL}messages/receiver/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

    const fetchFriends = async (messages) => {
        const fetchedFriends = [];
        for (let i = 0; i < messages.length; i++) {  
            try { 
                if (messages[i].receiver !== user.username) { 
                    const response = await fetch(`${API_URL}users/username/${messages[i].receiver}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    
                    if (response.ok) {
                        const friend = await response.json();
                        if (!friends.some(f => f.username === friend.username) && !fetchedFriends.some(f => f.username === friend.username)) {
                            fetchedFriends.push(friend);
                        }
                    } else {
                        throw new Error("Failed to fetch friends");
                    }
                } else {
                    const response = await fetch(`${API_URL}users/username/${messages[i].sender}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    
                    if (response.ok) {
                        const friend = await response.json();
                        if (!friends.some(f => f.username === friend.username) && !fetchedFriends.some(f => f.username === friend.username)) {
                            fetchedFriends.push(friend);
                        }
                    } else {
                        throw new Error("Failed to fetch friends");
                    }
                }
            } catch (error) {
                console.error("Friends fetch error:", error);
            }
        }
        setFriends([...friends, ...fetchedFriends]);
    }

    const selectContact = (username) => {
        setSelectedFriend(username);
    };

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
                        <li onClick={() => selectContact(friend.username)} className={"flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-500 "+ (friend.username === selectedFriend ? 'bg-gray-100 dark:bg-gray-600' : '')} key={friend.username}>
                            <img
                                src={friend.avatar}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-2">
                                <h4 className="font-semibold m-0">{friend.name}</h4>
                                <p>{friend.username}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;