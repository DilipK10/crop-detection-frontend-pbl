
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Consultant.module.css";
import { API_URL } from "../../../config"; // make sure it points to your backend

const ConsultantListing = () => {
    const [consultants, setConsultants] = useState([]);

    useEffect(() => {
        const fetchConsultants = async () => {
            try {
                const response = await fetch(`${API_URL}/appointment/consultant-list/`);
                const data = await response.json();

                // Map the backend response to required format
                const formattedData = data.map((item) => ({
                    id: item.id,
                    name: `${item.first_name} ${item.last_name}`,
                    experience: `${item.experience}+ Years`,
                    expertise: item.expertise,
                    image: `${API_URL}${item.profile}`,
                }));

                setConsultants(formattedData);
            } catch (error) {
                console.error("Error fetching consultants:", error);
            }
        };

        fetchConsultants();
    }, []);

    return (
        <div className={styles.consultantList}>
            <div className={styles.headerContainer}>
                <h2 className={styles.consultantTitle}>Our Expert Consultants</h2>
                <Link to="/consultant-history" className={styles.historyBtn}>
                    📜 Consultation History
                </Link>
            </div>

            <div className={styles.consultantContainer}>
                {consultants.map((consultant) => (
                    <div className={styles.consultantCard} key={consultant.id}>
                        <img
                            className={styles.consultantImage}
                            src={consultant.image}
                            alt={consultant.name}
                        />
                        <div className={styles.consultantDetails}>
                            <p className={styles.consultantName}>{consultant.name}</p>
                            <p className={styles.consultantExperience}>
                                <strong>Experience:</strong> {consultant.experience}
                            </p>
                            <p className={styles.consultantExpertise}>
                                <strong>Expertise:</strong> {consultant.expertise}
                            </p>
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
