import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import style from './Home.module.css';
import HomeSlider from '../HomeSlider/HomeSlider';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
const Home = () => {
    return (
        <> 
            <HomeSlider/>
            <Categories/>
            <Products/> 
            
        </>
    )
}

export default Home;