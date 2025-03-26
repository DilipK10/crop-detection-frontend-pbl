import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import userIcon from '../../../assets/svgs/user-solid.svg';
import cartIcon from '../../../assets/images/cart2.png';
import searchIcon from '../../../assets/images/search.png';

const Navbar = () => {
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
                <input type="text" id={style.searchInput} placeholder='Search Here...' />
                <img src={searchIcon} className={style.searchIcon} alt="Search Icon" />
            </div>

            {/* Icons Section */}
            <div className={style.iconDiv}>
                <img src={userIcon} className={style.userIcon} alt="User Icon" />
                <img src={cartIcon} className={style.cartIcon}  alt="Cart Icon" />
            </div>
        </nav>
    );
}

export default Navbar;
