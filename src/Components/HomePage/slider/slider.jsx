import React from "react";
import  style from "./slider.module.css";
import Slider from "react-slick";


const homeSlider = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	  };
		return (
			<section classname = "home-slider">
				 <div classname = "cointainer-fluid "> 
					<Slider {...settings}>
						<div>
							<img src = "https://images.unsplash.com/photo-1612835790406-4b6e8b4b7a8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt = "slider1"/>
						</div>
						<div>
							<img src = "https://images.unsplash.com/photo-1612835790406-4b6e8b4b7a8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt = "slider2"/>
						</div>
						<div>
							<img src = "https://images.unsplash.com/photo-1612835790406-4b6e8b4b7a8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt = "slider3"/>
						</div>
					</Slider>
						
				 </div>

			 </section>
		);
}
export default homeSlider;