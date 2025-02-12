import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавляем useNavigate

function PopupRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interviewLink, setInterviewLink] = useState(""); // Добавляем состояние для ссылки
  const navigate = useNavigate(); // Навигация

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://ai-hr-project.onrender.com/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }

      const data = await response.json();
      console.log("Успешная регистрация:", data);

      setInterviewLink(data.interview_link); // Сохраняем ссылку

      // Автоматический переход на страницу интервью
      navigate(`/interview/${data.id}`);
    } catch (error) {
      console.error("Ошибка:", error);
      setError("Не удалось зарегистрироваться. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Пройти собеседование</button>
      {isOpen && (
        <div className="popup">
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Имя"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
            <button type="submit" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          {interviewLink && (
            <p>
              <strong>Ссылка на интервью: </strong>
              <a href={interviewLink} target="_blank" rel="noopener noreferrer">
                {interviewLink}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PopupRegistration;

