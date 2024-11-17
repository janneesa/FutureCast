import React from "react";
import Card from "./Card";

function Loading() {
  return (
    <Card>
      <div className="flex justify-center items-center p-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
      </div>
    </Card>
  );
}

export default Loading;
