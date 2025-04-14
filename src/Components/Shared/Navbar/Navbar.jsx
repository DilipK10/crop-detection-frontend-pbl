import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate instead of useHistory
import style from './Navbar.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import userIcon from '../../../assets/svgs/user-solid.svg';
import cartIcon from '../../../assets/images/cart2.png';
import searchIcon from '../../../assets/images/search.png';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate(); // ✅ initialize navigate

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            console.log("Uploaded file:", file.name);
        }
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/search/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
            });
            const data = await response.json();

            if (response.ok) {
                if (data.category) {
                    navigate(`/products/category/${data.category}`); // ✅ replaced history.push
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
                <li><Link to="/" className={style.navItem}>Home</Link></li>
                <li><Link to="/about" className={style.navItem}>About Us</Link></li>
                <li><Link to="/co" className={style.navItem}>Consultant</Link></li>
                <li><Link to="/cart" className={style.navItem}>Cart</Link></li>
            </ul>

            {/* Search Bar */}
            <div className={style.searchDiv}>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        id={style.searchInput}
                        placeholder="Search Here..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">
                        <img src={searchIcon} className={style.searchIcon} alt="Search Icon" />
                    </button>
                </form>
            </div>

            {/* Icons + Upload Section */}
            <div className={style.iconDiv}>
                <Link to="/auth"><img src={userIcon} className={style.userIcon} alt="User Icon" /></Link>
                <Link to="/cart"><img src={cartIcon} className={style.cartIcon} alt="Cart Icon" /></Link>
                <Link to="/upload" className={style.uploadLabel}>Upload</Link>
            </div>
        </nav>
    );
};

export default Navbar;
