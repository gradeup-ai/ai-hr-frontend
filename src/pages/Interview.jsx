import React, { useState } from "react";

function Interview() {
  const [recording, setRecording] = useState(false);

  const handleStart = () => {
    setRecording(true);
  };

  return (
    <div>
      <h1>Интервью</h1>
      {!recording ? (
        <button onClick={handleStart}>Начать интервью</button>
      ) : (
        <p>Идет запись...</p>
      )}
    </div>
  );
}

export default Interview;
