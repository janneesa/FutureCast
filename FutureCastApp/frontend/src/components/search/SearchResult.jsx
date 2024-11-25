import Card from "../Card";

function SearchResult({
  avatar,
  username,
  predictionScore,
  id,
  viewProfileFunction,
}) {
  const showProfile = () => {
    viewProfileFunction(id);
  };

  return (
    <Card className="card">
      <div className="card-content flex flex-row" onClick={showProfile}>
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-semibold self-center">{username}</h3>
          <h5>Prediction Score: {predictionScore}</h5>
        </div>
      </div>
    </Card>
  );
}

export default SearchResult;
