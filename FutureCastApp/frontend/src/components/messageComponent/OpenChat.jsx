import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { useEffect } from "react";

function OpenChat( { selectedFriend }) {
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(selectedFriend);
    }, []);

    return (
        <div className="card flex flex-col p-2 h-[calc(100vh-8rem)]">
            <div className="card flex-grow p-2">
                {!selectedFriend ? ("No selected Friend") : (selectedFriend)}
            </div>
            <div className="flex gap-2 p-2">
                <input type="text" 
                placeholder="Type a message..." 
                className="input flex-grow"/>
                <button className="p-2 bg-primaryButton text-white rounded hover:bg-primaryButton/90 transition text-center dark:bg-darkPrimaryButton dark:hover:bg-darkPrimaryButton/90;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default OpenChat;