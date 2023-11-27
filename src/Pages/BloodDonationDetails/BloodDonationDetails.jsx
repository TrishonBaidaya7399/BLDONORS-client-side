import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import useUserInfo from "../../Hooks/useUserInfo";
import { useEffect, useState } from "react";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BloodDonationDetails = () => {
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
  const userInfo = useUserInfo();
  const [user, setUser] = useState(userInfo);
  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);
  
  const donationDetails = useLoaderData();
  const {
    recipientName,
    date,
    bloodGroup,
    time,
    district,
    donationStatus,
    fullAddress,
    hospitalName,
    status,
    upazila,
    _id,
  } = donationDetails;
  // Use useState to store the names
  const [districtName, setDistrictName] = useState("");
  const [upazilaName, setUpazilaName] = useState("");

  const fetchData = async (path) => {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  };

  const getDistrictNameById = async (districtId) => {
    const districtsData = await fetchData("/public/districts.json");
    const district = districtsData.find((item) => item.id === districtId);
    return district ? district.name : "";
};

const getUpazilaNameById = async (upazilaId) => {
    const upazilasData = await fetchData("/public/upazilas.json");
    const upazila = upazilasData.find((item) => item.id === upazilaId);
    return upazila ? upazila.name : "";
};

useEffect(() => {
    // Use Promise.all to fetch district and upazila names concurrently
    Promise.all([getDistrictNameById(district), getUpazilaNameById(upazila)])
    .then(([districtName, upazilaName]) => {
        setDistrictName(districtName);
        setUpazilaName(upazilaName);
    })
    .catch((error) => {
        console.error("Error fetching district and upazila names:", error);
    });
}, [district, upazila]);


const handleConfirm = async (e, id) => {
  e.preventDefault();

  const donorData = {
    donorName: userInfo?.name,
    donorEmail: userInfo?.email,
  };

  try {
    // request to update the donation request
    const result = await axiosSecure.patch(`/donationRequest/${id}`, donorData);

    console.log(result);

    if (result.data.modifiedCount > 0) {
      Swal.fire({
        title: "Confirmed!",
        icon: "success",
        text: "Your request to donate blood is confirmed",
        confirmButtonText: "Ok!",
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Please update some information",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  } catch (error) {
    console.error("Error confirming donation:", error);
    // Handle the error, for example, show an error message to the user
    Swal.fire({
      title: "Error!",
      text: "An error occurred while confirming the donation",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

  return (
    <div className="bg-red-500 bg-opacity-50 py-12">
      <div className="rounded-lg lg:mx-[200px] bg-white border-2 border-red-500 p-12">
        <div className="text-3xl font-bold flex justify-center">
          <h className="pb-2 border-b-[3px] border-red-500 w-fit px-4">
            Blood Donation Request details
          </h>
        </div>
        <div className="details text-start mt-10 lg:mx-[100px]">
          <p className="text-lg text-black">
            <span className="font-bold">Recipient Name: </span>
            {recipientName}
          </p>
          <p className="text-lg text-black">
            <span className="font-bold">Recipient Blood Group: </span>
            {bloodGroup}
          </p>
          <p className="text-lg text-black">
            <span className="font-bold">{`Donation's Date & Time: `}</span>
            {date} ( {time} )
          </p>
          <p className="text-lg text-black">
            <span className="font-bold">Donation Address: </span>
            {fullAddress}, district: {districtName}, Upazila: {upazilaName}
          </p>
          <p className="text-lg text-black">
            <span className="font-bold">Recipient Hospital Name: </span>
            {hospitalName}
          </p>
          <p className="text-lg text-black">
            <span className="font-bold">Reason for donation: </span>
            {donationStatus}
          </p>
          <p className="text-lg text-red-600 font-bold">
            <span className="font-bold text-black">Donation Status: </span>
            {status}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="bg-red-500 text-white text-xl font-bold px-12 py-2 rounded-lg mt-8"
          >
            Donate
          </button>
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box border-[3px] border-red-500">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
              ✕
            </button>
          </form>
          <div className="flex justify-center">
          <form>
            <div className="flex gap-2 items-center mb-2">
              <label htmlFor="donorName" className="font-bold block">
                Donor Name:
              </label>
              <input
                type="text"
                id="donorName"
                value={user[0]?.name}
                readOnly
                className="border p-2 border-green-600 rounded"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="donorEmail" className="font-bold block">
                Donor Email:
              </label>
              <input
                type="text"
                id="donorEmail"
                value={user[0]?.email}
                readOnly
                className="border p-2 border-green-600 rounded"
              />
            </div>
            {/* Other readonly fields */}
            <div className="flex justify-center">
            <button
            onClick={(e)=>handleConfirm(e,_id)}
              type="submit"
              className="bg-green-600 px-4 py-2 rounded-lg text-white my-4"
            >
              Confirm Donation
            </button></div>
          </form></div>
        </div>
      </dialog>
    </div>
  );
};

BloodDonationDetails.propTypes = {
  donationDetails: PropTypes.object,
};

export default BloodDonationDetails;
