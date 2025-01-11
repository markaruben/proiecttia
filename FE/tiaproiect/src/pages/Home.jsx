import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Homes = () => {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1>Welcome to FishNow!</h1>
        <p>Book a fishing session on your favorite lake!</p>
        <Link to="/lakes">
          <button>Book now!</button>
        </Link>
      </div>
    </div>
  );
};

export default Homes;
