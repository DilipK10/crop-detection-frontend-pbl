import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ConsultantDeatil.module.css"; // Importing CSS module
import img1 from "../../../assets/images/co.png"

const consultants = {
  1: {
    name: "Dr. Ananya Sharma",
    description:
      "Dr. Ananya Sharma is an expert in organic farming with over 10 years of experience in sustainable agriculture. She has helped numerous farmers improve soil health and increase productivity through eco-friendly techniques.",
    qualification: "PhD in Agricultural Science, Certified Organic Farming Expert",
    image: img1, // Replace with actual image
  },
  2: {
    name: "Rajesh Verma",
    description:
      "Rajesh Verma specializes in agricultural technology and innovation. With over 8 years of experience, he has introduced modern AI-based disease detection systems to help farmers maximize yield.",
    qualification: "MSc in Agricultural Technology, AI in Farming Specialist",
    image: img1,
  },
};

const ConsultantDetail = () => {
  const { id } = useParams();
  const consultant = consultants[id];

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!consultant) return <h2 className={styles.notFound}>Consultant not found</h2>;

  // Handle Booking Submission
  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time!");
      return;
    }
    alert(`Booking confirmed with ${consultant.name} on ${selectedDate} at ${selectedTime}`);
    setShowModal(false);
  };

  return (
    <div className={styles.consultantDetail}>
      <div className={styles.consultantCard}>
        <img src={consultant.image} alt={consultant.name} className={styles.consultantImage} />
        <h2 className={styles.consultantName}>{consultant.name}</h2>
        <p className={styles.consultantDescription}><strong>Description:</strong> {consultant.description}</p>
        <p className={styles.consultantQualification}><strong>Qualification:</strong> {consultant.qualification}</p>
        <button className={styles.scheduleBtn} onClick={() => setShowModal(true)}>Schedule Booking</button>
      </div>

      {/* Schedule Booking Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Schedule Booking</h3>
            <label>Date:</label>
            <input 
              type="date" 
              className={styles.inputField}
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
            />

            <label>Time:</label>
            <input 
              type="time" 
              className={styles.inputField}
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)} 
            />

            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={handleBooking}>Confirm</button>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantDetail;
