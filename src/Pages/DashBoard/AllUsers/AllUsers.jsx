// import PropTypes from 'prop-types';

import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [allUsers, setAllUsers] = useState()

    useEffect(()=>{
        axiosSecure.get("/users")
        .then(res=>{
            console.log(res.data);
            setAllUsers(res.data)
        })
    },[axiosSecure,setAllUsers])
    return (
        <div>
            <h1>{allUsers?.length}</h1>
            
            
        </div>
    );
};

AllUsers.propTypes = {
    
};

export default AllUsers;