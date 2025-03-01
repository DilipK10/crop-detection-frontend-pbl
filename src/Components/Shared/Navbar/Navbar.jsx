import React from 'react';
import style from './Navbar.module.css';
import logo from '../../../assets/svgs/react.svg'

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style.logoDiv}>
                <img src={logo} alt="Crop Detection Logo" />
                <h1>Crop Disease Detection</h1>
            </div>
        </nav>
    )
}

export default Navbar;