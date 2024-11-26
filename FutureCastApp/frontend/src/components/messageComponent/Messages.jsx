import FriendsList from './FriendsList';
import OpenChat from './OpenChat';

function Messages() {
  return (
  <div>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
    {/* Grid layout for large screens */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="flex justify-between items-start">
          <FriendsList />
        </div>
        <div className="flex justify-between items-start">
          <OpenChat />
        </div>
      </div>
    </main>
  </div>
  )
}
export default Messages;
