//importing necessary libraries and styles
import React from 'react';
import HomeSlider from '../HomeSlider/HomeSlider';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';

// This component serves as the main home page of the application, combining various sections like slider, categories, and products.
const Home = () => {
    return (
        <>
            <HomeSlider />
            <Categories />
            <Products />
        </>
    )
}

export default Home;