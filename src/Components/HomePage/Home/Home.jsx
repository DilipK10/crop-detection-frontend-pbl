import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import style from './Home.module.css';
import HomeSlider from '../HomeSlider/HomeSlider';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
const Home = () => {
    return (
        <>
            <Navbar />
            <HomeSlider/>
            <Categories/>
            <Products/>
            
            
        </>
    )
}

export default Home;