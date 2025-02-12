import React, { useState, useEffect } from "react";

function PopupRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
  });

  // Закрытие попапа при клике вне формы
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && event.target.classList.contains("popup-overlay")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Обработчик ввода
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Отправка формы на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ai-hr-project.onrender.com/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Ошибка регистрации");

      const data = await response.json();
      console.log("Успешная регистрация:", data);
      alert("Вы зарегистрированы! Ссылка на интервью отправлена на email.");
      setIsOpen(false);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка регистрации. Попробуйте снова.");
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Пройти собеседование</button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Имя" onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
              <input name="phone" placeholder="Телефон" onChange={handleChange} required />
              <select name="gender" onChange={handleChange}>
                <option value="male">Мужчина</option>
                <option value="female">Женщина</option>
              </select>
              <button type="submit">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupRegistration;

