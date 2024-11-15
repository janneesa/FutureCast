import Card from "../Card";

function SearchResult({ avatar, username }) {
  return (
    <Card className="card">
      <div className="card-content flex flex-row">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full  mt-4"
        />
        <p className="ml-4 text-lg font-semibold self-center">{username}</p>
      </div>
    </Card>
  );
}

export default SearchResult;
