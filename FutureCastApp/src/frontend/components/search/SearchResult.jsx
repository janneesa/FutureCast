import Card from "../Card";

function SearchResult({ avatar, username, predictionScore, id, user }) {
  const follow = () => {
    user.following.push(id);
  };

  return (
    <Card className="card">
      <div className="card-content flex flex-row">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4 ">
          <h3 className="font-semibold self-center">{username}</h3>
          <h5>Prediction Score: {predictionScore}</h5>
        </div>
        {user.following.includes(id) ? (
          <div className="self-center ml-auto">
            <button className="button button-secondary">Unfollow</button>
          </div>
        ) : (
          <div className="self-center ml-auto">
            <button className="button" onClick={follow}>
              Follow
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default SearchResult;
