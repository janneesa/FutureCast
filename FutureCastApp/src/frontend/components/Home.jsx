import { mockData } from "../data/MockData";
import Prediction from "./Prediction";

function Home() {
  const predictions = mockData.predictions;

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      {predictions.map((prediction) => (
        <Prediction key={prediction.id} {...prediction} />
      ))}
    </div>
  );
}
export default Home;
