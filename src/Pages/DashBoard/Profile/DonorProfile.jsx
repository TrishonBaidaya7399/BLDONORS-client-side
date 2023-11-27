// import PropTypes from 'prop-types';
import { useEffect } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import UserInfo from "../../../Components/UserInfo/UserInfo";

const DonorProfile = () => {
  const axiosPublic = useAxiosPublic();
    useEffect(()=>{
        axiosPublic.get(`/users/admin/:`)
    },[axiosPublic])
    return (
        <div className="">
            <UserInfo/>
        </div>
    );
};

DonorProfile.propTypes = {
    
};

export default DonorProfile;