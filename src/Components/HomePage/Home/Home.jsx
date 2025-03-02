import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import style from './Home.module.css';
import HomeSlider from '../Slider/Slider';

const Home = () => {
    return (
        <>
            <Navbar />
            <HomeSlider></HomeSlider>
            
        </>
    )
}

export default Home;