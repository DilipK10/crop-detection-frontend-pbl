//importing necessary libraries and styles
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ConsultantDeatil.module.css";
import { API_URL } from "../../../../config";

// This component displays the details of a consultant and allows users to book an appointment.
const ConsultantDetail = () => {
    const { id } = useParams();
    const [consultant, setConsultant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [mode, setMode] = useState("OFFLINE");
    
    useEffect(() => {
        // Fetch consultant details using the ID from the URL parameters
        const fetchConsultant = async () => {
            try {
                const response = await fetch(`${API_URL}/appointment/consultant/${id}/`);
                const data = await response.json();
                setConsultant({
                    id: data.id,
                    name: `${data.first_name} ${data.last_name}`,
                    experience: `${data.experience}+ Years`,
                    expertise: data.expertise,
                    email: data.email,
                    phone: data.phone,
                    starting_charges: data.starting_charges,
                    image: `${API_URL}${data.profile}`,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching consultant:", error);
                setLoading(false);
            }
        };

        fetchConsultant();
    }, [id]);

    // Function to handle booking appointment
    const handleBooking = async () => {
        if (!selectedDate || !selectedTime || !mode) {
            alert("Please select date, time, and mode!");
            return;
        }

        const payload = {
            consultantId: consultant.id,
            mode,
            date: selectedDate,
            start_time: `${selectedTime}:00`,
            end_time: `${parseInt(selectedTime.slice(0, 2)) + 1}:00:00`, // 1-hour slot
        };

        // Get the token from local storage
        const token = localStorage.getItem("access");

        // Check if token is available
        try {
            const res = await fetch(`${API_URL}/appointment/book/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert(`Booking confirmed with ${consultant.name} on ${selectedDate} at ${selectedTime} (${mode})`);
            } else {
                const errorData = await res.json();
                console.error("Booking failed:", errorData);
                alert("Please login to book an appointment");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong");
        }

        setShowTimeModal(false);
        setSelectedDate("");
        setSelectedTime("");
        setMode("OFFLINE");
    };

    // Render loading state or consultant details
    if (loading) return <p>Loading...</p>;
    if (!consultant) return <h2 className={styles.notFound}>Consultant not found</h2>;

    return (
        // Main component rendering the consultant details and booking functionality
        <div className={styles.consultantDetail}>
            {/* // Consultant details card */}
            <div className={styles.consultantCard}>
                {/* // Consultant image and information */}
                <img src={consultant.image} alt={consultant.name} className={styles.consultantImage} />
                {/* // Consultant information */}
                <div className={styles.consultantInfo}>
                    <h2 className={styles.consultantName}>{consultant.name}</h2>
                    <p><strong>Expertise:</strong> {consultant.expertise}</p>
                    <p><strong>Experience:</strong> {consultant.experience}</p>
                    <p><strong>Email:</strong> {consultant.email}</p>
                    <p><strong>Phone:</strong> {consultant.phone}</p>
                    <p><strong>Charges:</strong> ₹{consultant.starting_charges}</p>
                    {/* // Booking button */}
                    <div className={styles.bookingButtons}>
                        <button onClick={() => setShowDateModal(true)} className={styles.scheduleBtn}>Book Appointment</button>
                    </div>
                </div>
            </div>
            
            {/* Date Modal */}
            {showDateModal && (
                // Modal for selecting date
                <div className={styles.modal}>
                    // Modal content
                    <div className={styles.modalContent}>
                        <h3>Select Date</h3>
                        {/* Date input field */}
                        <input
                            type="date"
                            className={styles.inputField}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        {/* // Modal buttons for confirming or canceling */}
                        <div className={styles.modalButtons}>
                            <button className={styles.confirmBtn} onClick={() => {
                                if (!selectedDate) return alert("Select date first");
                                setShowDateModal(false);
                                setShowTimeModal(true);
                            }}>Next</button>
                            {/* // Cancel button to close the modal */}
                            <button className={styles.cancelBtn} onClick={() => setShowDateModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Time Modal */}
            {showTimeModal && (
                // Modal for selecting time and mode
                <div className={styles.modal}>
                    {/* // Modal content */}
                    <div className={styles.modalContent}>
                        <h3>Select Time & Mode</h3>
                        {/* Time input field */}
                        <input
                            type="time"
                            className={styles.inputField}
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        />

                        {/* Mode Selection */}
                        <div className={styles.modeToggle}>
                            <label>
                                {/* // Radio buttons for selecting mode (Online/Offline) */}
                                <input
                                    type="radio"
                                    value="ONLINE"
                                    checked={mode === "ONLINE"}
                                    onChange={() => setMode("ONLINE")}
                                />
                                Online
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="OFFLINE"
                                    checked={mode === "OFFLINE"}
                                    onChange={() => setMode("OFFLINE")}
                                />
                                Offline
                            </label>
                        </div>
                        {/* // Modal buttons for confirming or canceling */}
                        <div className={styles.modalButtons}>
                            <button className={styles.confirmBtn} onClick={handleBooking}>Confirm Booking</button>
                            <button className={styles.cancelBtn} onClick={() => setShowTimeModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultantDetail;
