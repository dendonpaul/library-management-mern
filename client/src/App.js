import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import "./App.css";
import AllClients from "./components/pages/clientpages/AllClients";
import AddClient from "./components/pages/clientpages/AddClient";
import EditClient from "./components/pages/clientpages/EditClient";
import AddBook from "./components/pages/bookpages/AddBook";
import AllBooks from "./components/pages/bookpages/AllBooks";
import EditBook from "./components/pages/bookpages/EditBook";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" element={<Home />} />}
      {user && <Route path="/allclients" element={<AllClients />} />}
      {user && <Route path="/addclient" element={<AddClient />} />}
      {user && <Route path="/editclient/:id" element={<EditClient />} />}
      {user && <Route path="/addbook" element={<AddBook />} />}
      {user && <Route path="/allbooks" element={<AllBooks />} />}
      {user && <Route path="/editbook/:id" element={<EditBook />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
