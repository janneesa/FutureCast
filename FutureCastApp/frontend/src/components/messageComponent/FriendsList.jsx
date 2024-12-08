import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";

function FriendsList({ selectedFriend, setSelectedFriend, messages, setMessages }) {
    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (value) => {
        setSearchWord(value);
        fetchSearchResults(value);
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
            const response = await fetch(`/api/messages/sender/${username}`, {
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
            const response = await fetch(`/api/messages/receiver/${username}`, {
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
                    const response = await fetch(`/api/users/username/${messages[i].receiver}`, {
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
                    const response = await fetch(`/api/users/username/${messages[i].sender}`, {
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

    const fetchSearchResults = async (searchWord) => {
        if (searchWord === "") {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(`/api/users/search/${searchWord}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const users = await response.json();
                //remove the logged in user and friends from the search results
                setSearchResults(users.filter(u => u.username !== user.username && !friends.some(f => f.username === u.username)));
            } else {
                throw new Error("Failed to fetch search results");
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const addConversation = (username) => {
        if (!friends.some(f => f.username === username)) {
            const friend = searchResults.find(u => u.username === username);
            setFriends([friend, ...friends]);
        }
        selectContact(username);
        setSearchWord("");
        setSearchResults([]);
    }

    return (
        <div className="card h-full p-2">
            <div>
                <h2 className="card-header">Messages</h2>
                <div className="hidden lg:flex p-2 relative flex-col">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="input flex-grow"
                        value={searchWord}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    ></input>
                    {searchResults && searchResults.length > 0 && (
                        <ul className="bg-white dark:bg-gray-800 w-full mt-1 rounded-md shadow-lg z-10">
                            {searchResults.map((user) => (
                                <li key={user.username} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => addConversation(user.username)}>
                                    <p>{user.name} ({user.username})</p>
                                </li>
                            ))}
                        </ul>
                    )}
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