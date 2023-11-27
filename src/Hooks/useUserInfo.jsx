// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useUserInfo = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    console.log("Inside useUserInfo: ",user?.email);
    const { data: userInfo = [], refetch } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
          const res = await axiosPublic.get(`/users/info?email=${user?.email}`);
          console.log("User from database: ", res?.data);
          return res.data;
        }
      });
      console.log("UserInfo inside useUserInfo: ", userInfo);
 return [userInfo, refetch]

};

useUserInfo.propTypes = {};

export default useUserInfo;
