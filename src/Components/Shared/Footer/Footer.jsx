import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Contact Us Section */}
                <div className={styles.section}>
                    <h3>Contact Us</h3>
                    <p><FiMapPin className={styles.icon} /> 123 Street, City, Country</p>
                    <p><FiPhoneCall className={styles.icon} /> +123 456 7890</p>
                    <p><FiMail className={styles.icon} /> contact@example.com</p>
                </div>

                {/* Quick Links Section */}
                <div className={styles.section}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us</a></li>

                    </ul>
                </div>

                {/* Service Section */}
                <div className={styles.section}>
                    <h3>Service</h3>
                    <ul>
                        <li><a href="#">Product Enquiry</a></li>
                    </ul>
                </div>
            </div>

            {/* Social Media Icons */}
            <div className={styles.socialContainer}>
                <p>Follow Us</p>
                <div className={styles.socialIcons}>
                    <FaFacebookF className={styles.socialIcon} />
                    <FaTwitter className={styles.socialIcon} />
                    <FaInstagram className={styles.socialIcon} />
                    <FaPinterestP className={styles.socialIcon} />
                    <FaYoutube className={styles.socialIcon} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
