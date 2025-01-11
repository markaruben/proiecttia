import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/LakeDetails.css";
import { jwtDecode } from "jwt-decode";

const LakeDetails = () => {
  const { id } = useParams();
  const [lake, setLake] = useState(null);
  const [userId, setUserId] = useState(null);
  const [swims, setSwims] = useState([]);
  const [reservations, setReservations] = useState({});
  const [error, setError] = useState(null);
  const [selectedDateRanges, setSelectedDateRanges] = useState({});

  useEffect(() => {
    const fetchLakeDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const lakeResponse = await fetch(
          `http://localhost:8000/api/lakes/${id}`,
          { headers }
        );
        const lakeData = await lakeResponse.json();
        setLake(lakeData);

        const swimsResponse = await fetch(
          `http://localhost:8000/api/lakes/${id}/swims`,
          { headers }
        );
        const swimsData = await swimsResponse.json();
        setSwims(swimsData);

        const reservationsData = {};
        for (const swim of swimsData) {
          const response = await fetch(
            `http://localhost:8000/reservations/${swim.id}/reservations`,
            { headers }
          );
          const data = await response.json();
          reservationsData[swim.id] = data;
        }
        setReservations(reservationsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLakeDetails();
  }, [id]);

  const handleDateRangeChange = (dates, swimId) => {
    const [startDate, endDate] = dates;
    setSelectedDateRanges((prevRanges) => ({
      ...prevRanges,
      [swimId]: { startDate, endDate },
    }));
  };

  const handleReservation = async (swimId) => {
    const selectedRange = selectedDateRanges[swimId];
    if (!selectedRange?.startDate || !selectedRange?.endDate) {
      alert("Please select a date range for reservation.");
      return;
    }

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const startDate = new Date(selectedRange.startDate);
    const endDate = new Date(selectedRange.endDate);

    const startDateUTC = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    );
    const endDateUTC = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    );

    const reservationData = {
      swimId: swimId,
      userId: userId,
      startDate: startDateUTC.toISOString().split("T")[0],
      endDate: endDateUTC.toISOString().split("T")[0],
    };

    try {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:8000/reservations/make`, {
        method: "POST",
        headers,
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error("Failed to reserve swim");

      alert("Reservation successful!");

      const updatedReservationsResponse = await fetch(
        `http://localhost:8000/reservations/${swimId}/reservations`,
        { headers }
      );
      const updatedReservations = await updatedReservationsResponse.json();
      setReservations((prevReservations) => ({
        ...prevReservations,
        [swimId]: updatedReservations,
      }));
      setSelectedDateRanges((prevRanges) => {
        const updatedRanges = { ...prevRanges };
        delete updatedRanges[swimId];
        return updatedRanges;
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);
  };

  useEffect(() => {
    getUserIdFromToken();
  }, []);

  const getExcludedDates = (swimId) => {
    const swimReservations = reservations[swimId] || [];
    const excludedDates = [];
    swimReservations.forEach((reservation) => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);

      const utcStart = new Date(
        Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
      );
      const utcEnd = new Date(
        Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
      );

      for (
        let d = new Date(utcStart);
        d <= utcEnd;
        d.setDate(d.getDate() + 1)
      ) {
        excludedDates.push(new Date(d));
      }
    });
    return excludedDates;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="lake-details-container">
      {lake ? (
        <>
          <div className="lake-details-header">
            <h1>Lake: {lake.name}</h1>
            <h1>Location: {lake.location}</h1>
            <h1>Size: {lake.size} Ha</h1>
          </div>

          <div className="swim-list">
            {swims && swims.length > 0 ? (
              swims.map((swim) => (
                <div className="swim-item" key={swim.id}>
                  <h3>Swim {swim.swimNumber}</h3>

                  <div className="calendar-container">
                    <DatePicker
                      selected={selectedDateRanges[swim.id]?.startDate}
                      onChange={(dates) =>
                        handleDateRangeChange(dates, swim.id)
                      }
                      startDate={selectedDateRanges[swim.id]?.startDate}
                      endDate={selectedDateRanges[swim.id]?.endDate}
                      selectsRange
                      minDate={new Date()}
                      placeholderText="Select date range"
                      dateFormat="yyyy/MM/dd"
                      className="calendar-date"
                      excludeDates={getExcludedDates(swim.id)}
                    />
                  </div>

                  <button
                    className="reserve-button"
                    onClick={() => handleReservation(swim.id)}
                  >
                    Reserve
                  </button>
                </div>
              ))
            ) : (
              <p>No swims available for this lake.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading lake details...</p>
      )}
    </div>
  );
};
export default LakeDetails;
