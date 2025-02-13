import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LiveKitRoom, VideoConference, LocalVideo, BarVisualizer } from "@livekit/components-react"; // Используем BarVisualizer

const Interview = () => {
  const { id } = useParams(); // Получаем ID интервью из URL
  const [token, setToken] = useState(null);
  const [roomUrl, setRoomUrl] = useState(null);
  const [voiceAssistantState, setVoiceAssistantState] = useState("active"); // Состояние для VoiceAssistant

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
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <LiveKitRoom url={roomUrl} token={token} connect>
        {/* Используем BarVisualizer для визуализации звука */}
        <BarVisualizer
          state={voiceAssistantState}  // Передаем состояние
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный фон
          }}
        />

        {/* Видео кандидата в маленьком окошке в правом нижнем углу */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "150px",
            height: "150px",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          <LocalVideo
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Видео конференция для всех участников */}
        <VideoConference
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            visibility: "hidden", // Скрыто, так как AI HR не имеет видео
          }}
        />
      </LiveKitRoom>
    </div>
  );
};

export default Interview;
