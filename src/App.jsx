import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/interview/:id" element={<Interview />} />
    </Routes>
  );
}

export default App;
