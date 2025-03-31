import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
   3:{
    name: " Yash Sharma",
    description:
      "Dr. Yash Sharma is an expert in organic farming with over 10 years of experience in sustainable agriculture. She has helped numerous farmers improve soil health and increase productivity through eco-friendly techniques.",
    qualification: "PhD in Agricultural Science, Certified Organic Farming Expert",
    image: img1, // Replace with actual image
  },
  4: {
    name: "Rajesh Verma",
    description:
      "Rajesh Verma specializes in agricultural technology and innovation. With over 8 years of experience, he has introduced modern AI-based disease detection systems to help farmers maximize yield.",
    qualification: "MSc in Agricultural Technology, AI in Farming Specialist",
    image: img1,
  },
  
};

const ConsultantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const consultant = consultants[id];

  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Get other consultants for reference section
  const referenceConsultants = Object.values(consultants).filter(c => c.name !== consultant.name).slice(0, 3);

  if (!consultant) return <h2 className={styles.notFound}>Consultant not found</h2>;

  // Handle Date Selection
  const handleDateSelect = () => {
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }
    setShowDateModal(false);
    setShowTimeModal(true);
  };

  // Handle Time Selection
  const handleTimeSelect = () => {
    if (!selectedTime) {
      alert("Please select a time!");
      return;
    }
  
    const newBooking = {
      consultantName: consultant.name,
      date: selectedDate,
      time: selectedTime,
    };
  
    const existingBookings = JSON.parse(localStorage.getItem("consultantBookings")) || [];
    existingBookings.push(newBooking);
    localStorage.setItem("consultantBookings", JSON.stringify(existingBookings));
  
    alert(`Booking confirmed with ${consultant.name} on ${selectedDate} at ${selectedTime}`);
    setShowTimeModal(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  // Handle Reference Consultant Click
  const handleReferenceClick = (consultantId) => {
    navigate(`/consultant/${consultantId}`);
  };

  return (
    <div className={styles.consultantDetail}>
      <div className={styles.consultantCard}>
        <img src={consultant.image} alt={consultant.name} className={styles.consultantImage} />
        <div className={styles.consultantInfo}>
          <h2 className={styles.consultantName}>{consultant.name}</h2>
          <p className={styles.consultantDescription}>{consultant.description}</p>
          <p className={styles.consultantQualification}>{consultant.qualification}</p>
          <div className={styles.bookingButtons}>
            <button className={styles.scheduleBtn} onClick={() => setShowDateModal(true)}>Schedule Date</button>
            <button className={styles.scheduleBtn} onClick={() => setShowTimeModal(true)}>Schedule Time</button>
          </div>
        </div>
      </div>

      {/* Reference Consultants Section */}
      <div className={styles.referenceSection}>
        <h3 className={styles.referenceTitle}>Other Expert Consultants</h3>
        <div className={styles.referenceGrid}>
          {referenceConsultants.map((refConsultant, index) => (
            <div 
              key={index} 
              className={styles.referenceCard}
              onClick={() => handleReferenceClick(Object.keys(consultants).find(key => consultants[key].name === refConsultant.name))}
            >
              <img src={refConsultant.image} alt={refConsultant.name} className={styles.referenceImage} />
              <h4 className={styles.referenceName}>{refConsultant.name}</h4>
              <p className={styles.referenceExpertise}>{refConsultant.qualification}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection Modal */}
      {showDateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select Date</h3>
            <input 
              type="date" 
              className={styles.inputField}
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
            />
            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={handleDateSelect}>Next</button>
              <button className={styles.cancelBtn} onClick={() => setShowDateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Time Selection Modal */}
      {showTimeModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select Time</h3>
            <input 
              type="time" 
              className={styles.inputField}
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)} 
            />
            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={handleTimeSelect}>Confirm</button>
              <button className={styles.cancelBtn} onClick={() => setShowTimeModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantDetail;
