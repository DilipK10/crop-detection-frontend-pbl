/** 
 * File: Components/Shared/Navbar/Navbar.jsx
 * Author: Yash Balotiya
 * Description: This component is used to display the Navbar of the website.
 * Created on: 01/03/2025
 * Last Modified: 01/03/2025
*/

// Importing Required Libraries
import React from 'react';
import style from './Navbar.module.css';
import logo from '../../../assets/images/soil-monitoring.png';
import userIcon from '../../../assets/svgs/user-solid.svg';
import searchIcon from '../../../assets/svgs/searchengin-brands.svg';

// Navbar Component
const Navbar = () => {
    return (
        // Navbar
        <nav className={style.navbar}>

            {/* Logo section */}
            <div className={style.logoDiv}>
                <img src={logo} className={style.logo} alt="Crop Detection Logo" />
                <h1 className={style.hd}>Crop Disease </h1>
            </div>

            {/* Search section */}
            <div className={style.searchDiv}>
                <input type="text" id={style.searchInput} placeholder='Search Here...' />
                <img src={searchIcon} className={style.searchIcon} alt="" />
            </div>

            {/* User Icon */}
            <img src={userIcon} className={style.userIcon} alt="" />
        </nav>
    )
}

export default Navbar;