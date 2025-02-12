import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

const Interview = () => {
  const { id } = useParams(); // Получаем ID интервью из URL
  const [token, setToken] = useState(null);
  const [roomUrl, setRoomUrl] = useState(null);

  useEffect(() => {
    // Запрашиваем токен для подключения к LiveKit
    const fetchToken = async () => {
      try {
        const response = await fetch(`https://ai-hr-project.onrender.com/livekit/token/${id}`);
        const data = await response.json();
        setToken(data.token);
        setRoomUrl(data.url);
      } catch (error) {
        console.error("Ошибка загрузки токена LiveKit:", error);
      }
    };

    fetchToken();
  }, [id]);

  if (!token || !roomUrl) {
    return <p>Загрузка видеозвонка...</p>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <LiveKitRoom url={roomUrl} token={token} connect>
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

export default Interview;
