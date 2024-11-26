import React, { useState, useContext } from "react";

function FriendsList() {
    const [searchWord, setSearchWord] = useState("");

    const handleSearch = () => {
        navigate("/app/search", { state: { searchWord } });
    };

    return (
        <div className="card h-full p-2">
            <div>
                <h2 className="card-header">Messages</h2>
                <div className="hidden lg:flex p-2">
                    <input
                    type="text"
                    placeholder="Search conversations..."
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
                <ul>
                    <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-500">
                        <img
                            src="https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b"
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <h4 className="font-semibold">Friend 1</h4>
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
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;