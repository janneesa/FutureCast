import Card from "../Card";

function ProfileCard({ user }) {
  return (
    <Card>
      <div className="card-content">
        <div className="flex flex-col items-center p-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.username}</p>
          <p className="text-center mt-4">{user?.bio}</p>
          <div className="flex justify-between w-full mt-6">
            <div className="text-center">
              <p className="font-bold">{user?.followers.length}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user?.following.length}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user?.predictions.length}</p>
              <p className="text-sm text-muted-foreground">Predictions</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
export default ProfileCard;
