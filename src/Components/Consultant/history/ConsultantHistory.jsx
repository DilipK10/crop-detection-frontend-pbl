
import React, { useState, useEffect } from "react";
import styles from "./ConsultantHistory.module.css";
import { API_URL } from "../../../../config";

const ConsultantHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("access"); // ✅ Correct key

            if (!token) {
                setError("User not authenticated. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/appointment/user-appointments/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Failed to fetch appointments");
                }

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className={styles.historyContainer}>
            <h2 className={styles.historyTitle}>Your Appointment History</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className={styles.errorMsg}>{error}</p>
            ) : bookings.length === 0 ? (
                <p className={styles.noHistory}>No appointments found</p>
            ) : (
                <ul className={styles.historyList}>
                    {bookings.map((booking) => (
                        <li key={booking.id} className={styles.historyItem}>
                            <p><strong>Date:</strong> {booking.date}</p>
                            <p><strong>Time:</strong> {booking.start_time} - {booking.end_time}</p>
                            <p><strong>Mode:</strong> {booking.mode.toUpperCase()}</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConsultantHistory;
