import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Shared/Navbar/Navbar';
import Home from './Components/HomePage/Home/Home';
import Footer from './Components/Shared/Footer/Footer';
import ProductDescription from './Components/ProductDescription/ProductDescription';
import ProductListing from './Components/ProductListing/ProductListing';
import OrderHistory from './Components/orderDetails/OrderHistory/OrderHistory';
import MyCart from './Components/orderDetails/my cart/MyCart';
import ConsultantListing from './Components/Consultant/Consultant';
import ConsultantDetail from './Components/Consultant/Details/ConsultantDetail';
import ConsultantHistory from './Components/Consultant/history/ConsultantHistory';
import { CartProvider } from "./CartContext";
import styles from './App.module.css'; // Import the CSS

const App = () => {
    return (
        <div className={styles.appContainer}>
            <BrowserRouter>
                <Navbar />
                <div className={styles.mainContent}>
                    <CartProvider>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/product/:id' element={<ProductDescription />} />
                        <Route exact path='/Listing' element={<ProductListing />} />
                        <Route exact path='/history' element={<OrderHistory />} />
                        <Route exact path='/cart' element={<MyCart />} />
                        <Route path="/co" element={<ConsultantListing />} />
                        <Route path="/consultant/:id" element={<ConsultantDetail />} />
                        <Route path="/consultant-history" element={<ConsultantHistory />} />
                    </Routes>
                    </CartProvider>
                </div>
                <Footer className={styles.footer} />
            </BrowserRouter>
        </div>
    );
};

export default App;
