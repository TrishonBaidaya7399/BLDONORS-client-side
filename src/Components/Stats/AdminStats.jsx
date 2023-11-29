// import PropTypes from 'prop-types';

import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaDonate, FaUsers } from "react-icons/fa";
import { BiSolidDonateBlood  } from "react-icons/bi";

const AdminStats = () => {
    const axiosSecure = useAxiosSecure();
    const [allUsers, setAllUsers] = useState()
    const [totalBloodDonation, setTotalBloodDonation] = useState()
    
    useEffect(()=>{
        axiosSecure.get("/users")
        .then(res=>{
            console.log(res.data);
            setAllUsers(res.data)
        })
    },[axiosSecure,setAllUsers])

    useEffect(()=>{
        axiosSecure.get("/donationRequest")
        .then(res=>{
            console.log(res.data);
            setTotalBloodDonation(res.data)
        })
    },[axiosSecure,setTotalBloodDonation])
    console.log("All users inside stats: ", allUsers);
    console.log("Total Blood donations inside stats: ", totalBloodDonation);
    return (
        <div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="cartItem w-full flex gap-12 w-fit bg-blue-500 p-8 rounded-xl">
                <div className="p-4 rounded-lg bg-blue-200 text-5xl text-center text-blue-500 m-auto flex items-center h-fit">
                    <FaUsers className=""/>
                </div>
                <div className="description text-gray-600 text-start flex flex-col gap-1">
                        <h1 className="text-2xl text-white font-bold">Total Users</h1>
                        <h1 className="text-3xl text-center text-white font-extrabold">{allUsers?.length}</h1>
                        <h1 className="text-xl text-white text-center font-semibold">Jan 1st - Feb 1st</h1>
                </div>
                </div>

                <div className="cartItem w-full flex gap-12 w-fit bg-red-500 p-8 rounded-xl">
                <div className="p-4 rounded-lg bg-red-200 text-5xl text-center text-red-500 m-auto  flex items-center h-fit">
                    <BiSolidDonateBlood className=""/>
                </div>
                <div className="description text-gray-600 text-start flex flex-col gap-1">
                        <h1 className="text-2xl text-white font-bold">Blood Donations</h1>
                        <h1 className="text-3xl text-center text-white font-extrabold">{totalBloodDonation?.length}</h1>
                        <h1 className="text-xl text-white text-center font-semibold">Jan 1st - Feb 1st</h1>
                </div>
                </div>

                <div className="cartItem w-full flex gap-12 w-fit bg-yellow-400 p-8 rounded-xl">
                <div className="p-4 rounded-lg bg-yellow-100 text-5xl text-center  m-auto text-yellow-400 flex items-center h-fit">
                    <FaDonate className=""/>
                </div>
                <div className="description text-gray-600 text-start flex flex-col gap-1">
                        <h1 className="text-2xl text-white font-bold">Total Fundings</h1>
                        <h1 className="text-3xl text-center text-white font-extrabold">$1,49,000</h1>
                        <h1 className="text-xl text-white text-center font-semibold">Jan 1st - Feb 1st</h1>
                </div>
                </div>
            </div>
        </div>
    );
};

AdminStats.propTypes = {
    
};

export default AdminStats;