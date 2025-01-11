import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
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
    } else {
      setError("Unable to retrieve user data from token.");
      return;
    }

    const fetchReservations = async () => {
      try {
        const reservationsResponse = await fetch(
          `http://localhost:8000/reservations/user/${userData.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        if (!reservationsResponse.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const userReservations = await reservationsResponse.json();
        setReservations(userReservations);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }

      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.id !== reservationId)
      );
    } catch (error) {
      alert(error.message);
    }
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
    <div className="profile-container">
      <h1>Profile</h1>
      <div>
        <h2>User Information</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>

      <div>
        <h2>Your Reservations</h2>
        {reservations.length > 0 ? (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                Swim {reservation.swimId} at {reservation.lakeName} from{" "}
                {reservation.startDate} to {reservation.endDate}
                <button onClick={() => handleDeleteReservation(reservation.id)}>
                  Delete Reservation
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
