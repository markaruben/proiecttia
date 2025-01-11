import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Lakes.css";

const Lakes = () => {
  const [lakes, setLakes] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserDataFromToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return {
        userId: decodedToken.userId,
        username: decodedToken.username,
        email: decodedToken.email,
      };
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserDataFromToken();
    if (userData) {
      setUser(userData);
    }

    const fetchLakes = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8000/api/lakes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch lakes data");
        }
        const data = await response.json();
        setLakes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLakes();
  }, []);

  const handleBookClick = (lakeId) => {
    navigate(`/lake/${lakeId}`);
  };

  if (!user) {
    return (
      <div className="no-user-container">
        <h2>Please log in or create an account</h2>
        <p>
          If you already have an account, you can <a href="/login">log in</a>.
          If you're new, please <a href="/signup">create an account</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="lakes-container">
      <h1 className="lakes-header">Available Lakes for Booking</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="lakes-list">
        {lakes.map((lake) => (
          <div className="lake-item" key={lake.id}>
            <h3 className="lake-name">{lake.name}</h3>
            <p className="lake-location">Location: {lake.location}</p>
            <button
              className="reserve-button"
              onClick={() => handleBookClick(lake.id)}
            >
              Book!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lakes;
