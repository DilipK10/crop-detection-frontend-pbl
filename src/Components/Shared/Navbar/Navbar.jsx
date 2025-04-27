import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import style from './Navbar.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import userIcon from '../../../assets/svgs/user-solid.svg';
import cartIcon from '../../../assets/images/cart-img.png';
import searchIcon from '../../../assets/images/search.png';
import { API_URL } from '../../../../config';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access');
            setIsLoggedIn(!!token);
        };
    
        checkAuth(); // initial check
    
        // Listen for storage changes (login/logout)
        window.addEventListener('storage', checkAuth);
    
        // Clean up
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLoggedIn(false);
        navigate('/'); // Redirect to home after logout
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/search/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
            });
            const data = await response.json();

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
            <div className={style.logoDiv}>
                <img src={logo} className={style.logo} alt="Crop Detection Logo" /> 
                <h1 className={style.hd}>Crop Disease</h1> 
            </div>

            <ul className={style.navLinks}>
                <li><Link to="/" className={style.navItem}>Home</Link></li>
                <li><Link to="/listing" className={style.navItem}>Products</Link></li>
                <li><Link to="/co" className={style.navItem}>Consultant</Link></li>
                <li><Link to="/cart" className={style.navItem}>Cart</Link></li>
            </ul>

            <div className={style.iconDiv}>
                {isLoggedIn ? (
                    <>
                        {/* Show Logout button if logged in */}
                        <button onClick={handleLogout} className={style.linkButton}>Logout</button>
                    </>
                ) : (
                    <>
                        {/* Show Login button if not logged in */}
                        <Link to="/auth" className={style.linkButton}>Login</Link>
                    </>
                )}
                
                {/* Upload Scan Link */}
                <Link to="/upload" className={style.uploadLabel}>Scan Crop</Link>
            </div>
        </nav>
    );
};

export default Navbar;
