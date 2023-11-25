// import PropTypes from 'prop-types';

import { FaUsers, FaTrophy  } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { IoIosWater  } from "react-icons/io";

const Stats = () => {
    return (
        <div className="bg-black text-gray-200 py-12 px-12 flex flex-wrap md:flex-row justify-center gap-12 lg:gap-[100px] items-center mb-12">
            <div className="flex flex-col justify-center items-center">
                <FaUsers className="text-6xl text-red-500"/>
                <p className="text-2xl">200</p>
                <p className="text-xl">Happy Donors</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <IoIosWater className="text-6xl text-red-500"/>
                <p className="text-2xl">08</p>
                <p className="text-xl">Blood Groups</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <FaHandshake className="text-6xl text-red-500"/>
                <p className="text-2xl">45</p>
                <p className="text-xl">Success Smile</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <FaTrophy  className="text-6xl text-red-500"/>
                <p className="text-2xl">90</p>
                <p className="text-xl">Total Awards</p>
            </div>
            
        </div>
    );
};

Stats.propTypes = {
    
};

export default Stats;