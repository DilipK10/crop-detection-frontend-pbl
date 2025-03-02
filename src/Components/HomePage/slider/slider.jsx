import React from "react";
import  style from "./slider.module.css";
import Slider from "react-slick";
import slider1 from '../../../assets/images/slider-1.png';
import slider2 from '../../../assets/images/slider-2.png';



const HomeSlider = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	  };
		return (
			<section classname = "homeSlider">
				 <div classname = "cointainer-fluid "> 
				 <Slider {...settings} className="home_slider_main">
					<div className="item">
						<img src={slider1} alt="slider1" className= 's1-image'/>
					</div>
					<div className="item">
						<img src={slider2} alt="slider1" className= 's2-image'/>
					</div>
						
				</Slider>
						
				 </div>

			 </section>
		);
}
export default HomeSlider;