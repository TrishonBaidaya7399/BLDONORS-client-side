// import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import useUserInfo from "../../../Hooks/useUserInfo";
import { NavLink } from "react-router-dom";

const VolunteerAllBloodDonation = () => {
  const userInfo = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    axiosSecure.get("/donationRequest").then((res) => {
      console.log(res.data);
      setAllUsers(res.data);
      setRecords(res.data);
    });
  }, [axiosSecure]);

  // Function to handle updating donation status
  const handleUpdateStatus = async (requestId, newStatus) => {
    const donorData = {
      donorName: newStatus === "done" ? userInfo[0]?.name : "",
      donorEmail: newStatus === "done" ? userInfo[0]?.email : "",
      status: newStatus,
    };
    // console.log("Update requested: ", donorData);
    try {
      // request to update the donation request
      const result = await axiosSecure.patch(
        `/donationRequest/${requestId}`,
        donorData
      );

      console.log(result);

      if (result.data.modifiedCount > 0) {
        {
          newStatus === "done"
            ? Swal.fire({
                title: "Done!",
                icon: "success",
                text: "Thanks to donate blood",
                confirmButtonText: "Ok!",
              })
            : Swal.fire({
                title: "Canceled!",
                icon: "success",
                text: "Blood donation status set to Canceled!",
                confirmButtonText: "Ok!",
              });
        }
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
    console.log(`Updating status of donation ${requestId} to ${newStatus}`);
  };

  const columns = [
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Recipient Name"}</h1>
        </div>
      ),
      cell: (row) => <h1 className="">{row.recipientName}</h1>,
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Blood Group"}</h1>
        </div>
      ),
      selector: (row) => <h1 className="">{row.bloodGroup}</h1>,
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Date"}</h1>
        </div>
      ),
      selector: (row) => row.date,
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Hospital Name"}</h1>
        </div>
      ),
      selector: (row) => row.hospitalName,
      sortable: true,
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Full Address"}</h1>
        </div>
      ),
      selector: (row) => row.fullAddress,
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Donor Name"}</h1>
        </div>
      ),
      selector: (row) => row.donorName ? row.donorName : "pending...",
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Donor Email"}</h1>
        </div>
      ),
      selector: (row) => row.donorEmail ? row.donorEmail : "pending...",
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Donation Status"}</h1>
        </div>
      ),
      selector: (row) => row.status,
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"View"}</h1>
        </div>
      ),
      cell: (row) => (
        <NavLink
        to={`/dashboard/RequestedDonationDetails/${row?._id}`}
      >
        <button
          disabled={userInfo[0]?.status !== "active"}
          className={`py-2 px-4 ${
            userInfo[0]?.status !== "active"
              ? "button-disabled"
              : "bg-blue-700 text-white"
          } rounded-md`}
          id={row._id}
        >
          View
        </button>
      </NavLink>
      ),
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Done"}</h1>
        </div>
      ),
      cell: (row) => (
        <button
          className={`py-2 px-4 ${
            row.status === "inprogress"
              ? "bg-green-500 text-white"
              : "button-disabled"
          } rounded-md`}
          onClick={() => handleUpdateStatus(row._id, "done")}
        >
          Done
        </button>
      ),
    },
    {
      name: (
        <div className=" text-center text-[14px] font-bold py-2 rounded-lg">
          <h1>{"Cancel"}</h1>
        </div>
      ),
      cell: (row) => (
        <button
          className={`py-2 px-4 ${
            row.status === "inprogress"
              ? "bg-red-500 text-white"
              : "button-disabled"
          } rounded-md`}
          onClick={() => handleUpdateStatus(row._id, "canceled")}
        >
          Cancel
        </button>
      ),
    },
  ];
  return (
    <div className="w-screen">
      <h1 className="text-4xl font-bold pb-4 mx-auto px-6 w-fit text-center border-b-[3px] border-red-500">
        All Donation Requests
      </h1>
      <div className="table max-w-screen lg:mx-[20px] mt-6 mb-12 border-[5px] rounded-sm border-red-500 overflow-x-auto">
        {allUsers?.length > 0 ? (
          <DataTable
            columns={columns}
            data={records}
            fixedHeader
            pagination
          ></DataTable>
        ) : (
          <h1>No Data Available Right Now</h1>
        )}
      </div>
    </div>
  );
};

VolunteerAllBloodDonation.propTypes = {};

export default VolunteerAllBloodDonation;
