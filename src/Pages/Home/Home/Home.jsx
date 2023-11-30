// import PropTypes from 'prop-types';

import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import CurrentRequest from "../Current Request/CurrentRequest";
import Featured from "../Featured/Featured";
import Stats from "../Stats/Stats";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="mx-auto overflow-x-hidden">
          <Banner/>  
          <Featured/>
          <CurrentRequest/>
          <Stats/>
          <Testimonials/>
          <ContactUs/>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;