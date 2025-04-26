import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate instead of useHistory
import style from './Navbar.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import userIcon from '../../../assets/svgs/user-solid.svg';
import cartIcon from '../../../assets/images/cart-img.png';
import searchIcon from '../../../assets/images/search.png';
import { API_URL } from '../../../../config'; // Adjust the import based on your project structure

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate(); 

    // Handle the search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle file upload change
    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setUploadedFile(file); 
            console.log("Uploaded file:", file.name);
        }
    };

    // Handle the search form submission (async request to the backend)
    const handleSearchSubmit = async (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        try {
            // Sending search term to the API endpoint
            const response = await fetch(`${API_URL}/search/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }), // Send the search term in the body
            });
            const data = await response.json(); 

            // If the search was successful, navigate to the category page
            if (response.ok) {
                if (data.category) {
                    navigate(`/products/category/${data.category}`); 
                } else {
                    console.log("No category found");
                }
            } else {
                console.error("Search failed", data); 
            }
        } catch (error) {
            console.error("Error with search", error); 
        }
    };

    return (
        <nav className={style.navbar}>
            {/* Logo Section */}
            <div className={style.logoDiv}>
                <img src={logo} className={style.logo} alt="Crop Detection Logo" /> 
                <h1 className={style.hd}>Crop Disease</h1> 
            </div>

            {/* Navigation Links */}
            <ul className={style.navLinks}>
                {/* Home Link */}
                <li><Link to="/" className={style.navItem}>Home</Link></li>
                {/* Products Link */}
                <li><Link to="/listing" className={style.navItem}>Products</Link></li>
                {/* Consultant Link */}
                <li><Link to="/co" className={style.navItem}>Consultant</Link></li>
                {/* Cart Link */}
                <li><Link to="/cart" className={style.navItem}>Cart</Link></li>
            </ul>

            {/* Icons + Upload Section */}
            <div className={style.iconDiv}>
                {/* User Icon - Link to authentication page */}
                <Link to="/auth"><img src={userIcon} className={style.userIcon} alt="User Icon" /></Link>
                {/* Cart Icon - Link to the cart */}
                <Link to="/cart"><img src={cartIcon} className={style.cartIcon} alt="Cart Icon" /></Link>
                {/* Upload Section - Link to upload scan page */}
                <Link to="/upload" className={style.uploadLabel}>Scan Crop</Link>
            </div>
        </nav>
    );
};

export default Navbar;

