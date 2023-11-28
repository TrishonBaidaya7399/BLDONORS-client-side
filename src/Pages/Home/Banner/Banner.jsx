// import PropTypes from 'prop-types';
// import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="-mb-2">
      <Slider {...settings}>
        <div>
          <div
            className="hero min-h-[60vh] md:min-h-[70vh]"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/DWwXCJr/banner-1.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md text-white">
                <h1 className="mb-5 text-5xl font-bold">Join as a donor</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <Link to="/register"><button className="btn bg-black bg-opacity-50 text-white border-2 border-red-500 rounded-md">Get Started</button></Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="hero min-h-[70vh]"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/LNSLJLZ/banner-2.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md text-white">
                <h1 className="mb-5 text-5xl font-bold">Join as a donor</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <Link to="/register"><button className="btn bg-black bg-opacity-50 text-white border-2 border-red-500 rounded-md">Get Started</button></Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="hero min-h-[70vh]"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/c6jVVhk/banner-3.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md text-white">
                <h1 className="mb-5 text-5xl font-bold">Join as a donor</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <Link to="/register"><button className="btn bg-black bg-opacity-50 text-white border-2 border-red-500 rounded-md">Get Started</button></Link>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

Banner.propTypes = {};

export default Banner;
