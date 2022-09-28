import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import "./App.css";
import AllClients from "./components/pages/AllClients";
import AddClient from "./components/pages/AddClient";
import EditClient from "./components/pages/EditClient";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" element={<Home />} />}
      {user && <Route path="/allclients" element={<AllClients />} />}
      {user && <Route path="/addclient" element={<AddClient />} />}
      {user && <Route path="/editclient/:id" element={<EditClient />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
