import React from "react";
import { Link } from "react-router-dom";
import styles from "./Consultant.module.css"; // Using module-based CSS
import img1 from "../../assets/images/co.png"


const consultants = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    experience: "10+ Years",
    expertise: "Organic Farming & Sustainable Agriculture",
    image: img1, // Replace with actual image
  },
  {
    id: 2,
    name: "Rajesh Verma",
    experience: "8+ Years",
    expertise: "Agricultural Technology & Innovation",
    image: img1,
  },
  {
    id: 3,
    name: "Yash Shrama",
    experience: "8+ Years",
    expertise: "Agricultural Technology & Innovation",
    image: img1,
  },
  {
    id: 4,
    name: "Rajesh Verma",
    experience: "8+ Years",
    expertise: "Agricultural Technology & Innovation",
    image: img1,
  },
];

const ConsultantListing = () => {
  return (
    <div className={styles.consultantList}>
      <h2 className={styles.consultantTitle}>Our Expert Consultants</h2>
      <div className={styles.consultantContainer}>
        {consultants.map((consultant) => (
          <div className={styles.consultantCard} key={consultant.id}>
            <img className={styles.consultantImage} src={consultant.image} alt={consultant.name} />
            <div className={styles.consultantDetails}>
              <p className={styles.consultantName}>{consultant.name}</p>
              <p className={styles.consultantExperience}><strong>Experience:</strong> {consultant.experience}</p>
              <p className={styles.consultantExpertise}><strong>Expertise:</strong> {consultant.expertise}</p>
              <Link to={`/consultant/${consultant.id}`} className={styles.detailsBtn}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultantListing;
