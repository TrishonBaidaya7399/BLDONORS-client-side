import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";
import useUserInfo from "../../../Hooks/useUserInfo";

const DonationRequest = () => {
  const userInfo = useUserInfo();
  const [requests, setRequests] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
console.log("requested data: ", requests);
// Fetch districts and upazilas here
    fetch("/districts.json")
    .then((response) => response.json())
    .then((data) => setDistricts(data))
    .catch((error) => console.error("Error fetching districts:", error));

    fetch("/upazilas.json")
    .then((response) => response.json())
    .then((data) => setUpazilas(data))
    .catch((error) => console.error("Error fetching upazilas:", error));
    
    useEffect(() => {
    // Fetch donation requests
    axiosPublic
      .get("/donationRequest", { params: { status: "pending" } })
      .then((result) => {
        console.log("requested data: ", result.data);
        setRequests(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching donation request:", error);
        setLoading(false)
      });
  }, [axiosPublic, setRequests]);

  // Function to get district name by ID
  const getDistrictNameById = (districtId) => {
    const district = districts.find((dist) => dist.id === districtId);
    return district ? district.name : "Loading...";
  };

  // Function to get upazila name by ID
  const getUpazilaNameById = (upazilaId) => {
    const upazila = upazilas.find((upaz) => upaz.id === upazilaId);
    return upazila ? upazila.name : "Loading...";
  };
console.log("UserInfo Status: ",userInfo[0].status);

  return (
    <div>
      <div className="flex mx-auto pt-12 text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
        All Pending Donation Requests
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[100vh] m-12  rounded-md border-[5px] border-red-500">
      {loading 
      ? (
          <p className="text-center text-2xl py-6"><span className="loading loading-spinner loading-lg"></span></p>
      )
      :
        <table className="table">
          {/* head */}
          <thead className="bg-red-500 text-lg text-white font-semibold border-2 border-red-500">
            <tr>
              <th>View</th>
              <th>Recipient Name</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Hospital Name</th>
              <th>Full Address</th>
              <th>District</th>
              <th>Upazila</th>
              <th>Donation Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold bg-red-500 bg-opacity-20 border-2 border-red-500">
            {/* rows */}
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id} className="border-b-2 border-red-500">
                  <td className="border-r-2 border-red-500">
                  <NavLink to={`http://localhost:5173/bloodDonationDetails/${request._id}`}><button disabled={userInfo[0]?.status !== "active"} className={`py-2 px-4 ${userInfo[0]?.status !== "active" ? 'button-disabled' : 'bg-red-500 text-white'} rounded-md`} id={request._id}>View</button></NavLink>
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request ? request.recipientName : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request ? request.bloodGroup : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request ? request.date : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request ? request.time : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request ? request.hospitalName : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request ? request.fullAddress : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request
                      ? getDistrictNameById(request.district)
                      : "Loading..."}
                  </td>
                  <td className="border-r-2 border-red-500">
                    {request
                      ? getUpazilaNameById(request.upazila)
                      : "Loading..."}
                  </td>
                  <td>{request ? request.donationStatus : "Loading..."}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-2xl py-6">No pending donation request available right now</td>
              </tr>
            )}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
};

export default DonationRequest;
