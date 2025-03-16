import React from 'react'
import  {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Navbar from './Components/Shared/Navbar/Navbar'
import Home from './Components/HomePage/Home/Home'
import Footer from './Components/Shared/Footer/Footer';
import ProductDescription from './Components/ProductDescription/ProductDescription'

const App = () => {
    return (
	    <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
            <Route exact={true} path='/' element={<Home/>}/>
            <Route exact={true} path='/Description' element={<ProductDescription/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
            
            

        </>
    )
}

export default App;