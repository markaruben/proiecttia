import React from "react";
import "../styles/Navbar.css";
import Logo from "../assets/fishNowLogo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwtToken");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/home");
  };

  return (
    <header className="header">
      <a href="/home" className="logo">
        <img src={Logo} alt="FishNow Logo" />
      </a>
      <nav className="navbar">
        <a href="/home">Home</a>
        <a href="/lakes">Lakes</a>
        <a href="/about">About</a>
        <a href="/profile">Profile</a>
        {isLoggedIn ? (
          <a href="/#" onClick={handleLogout}>
            Log out
          </a>
        ) : (
          <a href="/login">Log in</a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
