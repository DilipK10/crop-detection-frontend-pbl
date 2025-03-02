import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import style from './Home.module.css';
import homeSlider from '../slider/slider';

const Home = () => {
    return (
        <>
            <Navbar />
            <homeSlider/>
        </>
    )
}

export default Home;