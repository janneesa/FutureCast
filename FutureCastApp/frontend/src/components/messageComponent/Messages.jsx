import FriendsList from './FriendsList';
import OpenChat from './OpenChat';
import { useState } from 'react';

function Messages() {
  const [selectedFriend, setSelectedFriend] = useState({});
  const [messages, setMessages] = useState([]);

return (
  <div>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      {/* Grid layout for large screens */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="flex justify-between items-start">
          <FriendsList selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} messages={messages} setMessages={setMessages} />
        </div>
        <div className="flex justify-between items-start">
          <OpenChat selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} messages={messages} setMessages={setMessages} />
        </div>
      </div>
      {/* Layout for small screens */}
      <div className="flex justify-center lg:hidden">
        {Object.keys(selectedFriend).length === 0 ? (
          <FriendsList selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} messages={messages} setMessages={setMessages} />
        ) : (
          <OpenChat selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} messages={messages} setMessages={setMessages} />
        )}
      </div>
    </main>
  </div>
);
}
export default Messages;
