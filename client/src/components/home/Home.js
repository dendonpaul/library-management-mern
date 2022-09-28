import React from "react";
import "./home.css";
import Header from "../pagecomps/Header";
import Contents from "../pagecomps/Contents";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <section className="main_container">
      <Header />
      <div className="contents_container">Contents</div>
    </section>
  );
};

export default Home;
