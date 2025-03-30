import React, { useState, useEffect } from "react";
import styles from "./ConsultantHistory.module.css"; // CSS Module

const ConsultantHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("consultantBookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleCancelBooking = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem("consultantBookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyTitle}>Consultation Booking History</h2>
      {bookings.length === 0 ? (
        <p className={styles.noHistory}>No bookings found</p>
      ) : (
        <ul className={styles.historyList}>
          {bookings.map((booking, index) => (
            <li key={index} className={styles.historyItem}>
              <p><strong>Consultant:</strong> {booking.consultantName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <button className={styles.cancelBtn} onClick={() => handleCancelBooking(index)}>
                ❌ Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultantHistory;
