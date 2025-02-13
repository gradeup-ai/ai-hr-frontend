import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LiveKitRoom, ParticipantTile } from "@livekit/components-react"; // Используем ParticipantTile
import emilyPhoto from "../assets/emily-photo.png"; // Импортируем изображение Эмили

const Interview = () => {
  const { id } = useParams(); // Получаем ID интервью из URL
  const [token, setToken] = useState(null);
  const [roomUrl, setRoomUrl] = useState(null);
  const [trackRef, setTrackRef] = useState(null); // trackRef для видео потока

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

  useEffect(() => {
    if (trackRef) {
      console.log("Track is available");
    }
  }, [trackRef]);

  if (!token || !roomUrl) {
    return <p>Загрузка видеозвонка...</p>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <LiveKitRoom url={roomUrl} token={token} connect>
        {/* Фото Эмили вместо голосовой волны */}
        <img
          src={emilyPhoto}  // Используем импортированное изображение
          alt="AI HR - Эмили"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",  // Полупрозрачный фон
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
          {/* Используем ParticipantTile для отображения видео кандидата */}
          <ParticipantTile trackRef={trackRef} />
        </div>

      </LiveKitRoom>
    </div>
  );
};

export default Interview;
