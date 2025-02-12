import React, { useState } from "react";

function PopupRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Регистрация:", form);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Пройти собеседование</button>
      {isOpen && (
        <div className="popup">
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Имя" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Телефон" onChange={handleChange} />
            <select name="gender" onChange={handleChange}>
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PopupRegistration;
