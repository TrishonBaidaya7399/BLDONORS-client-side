import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

// import PropTypes from 'prop-types';
const axiosValunteer = axios.create({
  baseURL: `https://bldonors-server.vercel.app`,
});
const useAxiosVolunteer = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  // Add a request interceptor
  axiosValunteer.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("accessToken");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosValunteer.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logOut().then(() => {
          navigate("/login");
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosValunteer;
};

useAxiosVolunteer.propTypes = {};

export default useAxiosVolunteer;
