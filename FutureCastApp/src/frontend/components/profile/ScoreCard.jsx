import Card from "../Card";

function ScoreCard({ user }) {
  return (
    <Card title="Prediction Score">
      <div className="card-content">
        <div className="flex flex-col items-center pb-4">
          <p className="text-3xl font-bold mt-2">{user?.predictionScore}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Based on {user?.successfulPredictions.length} successful predictions
            out of {user?.predictions.length} total
          </p>
        </div>
      </div>
    </Card>
  );
}
export default ScoreCard;
