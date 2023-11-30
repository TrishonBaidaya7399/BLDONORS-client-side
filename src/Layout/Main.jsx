// import PropTypes from 'prop-types';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";


const Main = () => {
    const location =useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes("register")
    return (
        <div className="font-serif">
            {noHeaderFooter || <Navbar className="z-20"/>}
            <Outlet/>
            {noHeaderFooter || <Footer/>}
        </div>
    );
};

Main.propTypes = {
    
};

export default Main;