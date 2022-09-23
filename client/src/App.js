import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" element={<Home />} />}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
