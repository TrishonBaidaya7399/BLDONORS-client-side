import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUserInfo from "../../../Hooks/useUserInfo";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";


const MyDonationRequestPage = () => {
  const userInfo = useUserInfo();
  const [requests, setRequests] = useState([]);
  console.log(requests)
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [showAllRequests, setShowAllRequests] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  // Pagination stats
  const [activePage, setActivePage] = useState(1);
const itemsPerPage = 5;
const startIndex = (activePage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    // Fetch districts and upazilas here
    fetch("/districts.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((response) => response.json())
      .then((data) => setUpazilas(data))
      .catch((error) => console.error("Error fetching upazilas:", error));
  }, []);

  useEffect(() => {
    axiosPublic
      .get("/donationRequest")
      .then((result) => {
        const userInfoEmail = userInfo[0]?.email || "";
        const filteredRequests = result.data.filter(
          (request) => request.requesterEmail === userInfoEmail
        );
        const recentRequests = filteredRequests;
        console.log(recentRequests);
        setRequests(recentRequests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching donation request:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [activePage]);

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

  //   console.log("UserInfo Status: ", userInfo[0]?.status);
  // Function to handle updating donation status
  const handleUpdateStatus = async (requestId, newStatus) => {
    const donorData = {
      donorName: newStatus === "done" ? userInfo[0]?.name : "",
      donorEmail: newStatus === "done" ? userInfo[0]?.email : "",
      status: newStatus,
    };
    console.log("Update requested: ", donorData);
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

  const handleDelete = (id) => {
    console.log("Requested to delete: ", id);
    Swal.fire({
      title: "Are you sure?????",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donationRequest/${id}`).then((res) => {
          console.log("Deleted Count: ", res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  // Function to filter requests based on status
  const filteredRequests = requests.filter((request) => {
    if (filterStatus === "all") {
      return true; // Show all requests
    }
    return request.status === filterStatus;
  });
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

// console.log("Filtered Data: ", filteredRequests);


return (
    <div className="mx-auto mb-12">
      <div className="flex mx-auto lg:pt-12 text-xl lg:text-3xl font-bold text-black pb-2 w-fit text-center md:px-4 border-b-2 border-red-500">
        {`${userInfo[0]?.name}'s Donation Requests`}
      </div>
      <div className="filter-buttons flex gap-4 mx-auto justify-center bg-red-500 w-fit px-8 py-2 rounded-lg mb-8 w-[95vw] mt-6">
        <label htmlFor="statusFilter" className="text-white font-semibold">
          Filter by Status:
        </label>
        <select
          className="rounded-lg"
          id="statusFilter"
          onChange={handleFilterChange}
          value={filterStatus}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="flex justify-end mx-4 mb-2">
        <button
          className="text-red-500 underline hidden"
          onClick={() => setShowAllRequests(!showAllRequests)}
        >
          {showAllRequests ? "Show Recent 3 Requests" : "Show All Requests"}
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-w-[90vw] max-h-[80vh] mx-auto lg:mx-12 -mt-6  rounded-md border-[5px] border-red-500">
        {loading ? (
          <p className="text-center text-2xl py-6">
            <span className="loading loading-spinner loading-lg"></span>
          </p>
        ) : (
          <table className="table">
            {/* head */}
            <thead className="bg-red-500 text-lg text-white font-semibold border-2 border-red-500">
              <tr>
                <th>Recipient Name</th>
                <th>Blood Group</th>
                <th>Date & time</th>
                <th>Hospital Name</th>
                <th>Full Address</th>
                <th>Donor Name</th>
                <th>Donor Email</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Donation Status</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Confirm</th>
                <th>Cancle</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold bg-red-500 bg-opacity-20 border-2 border-red-500">
              {/* rows */}
              {requests ? (
                filteredRequests.slice(startIndex, endIndex).map((request) => (
                  <tr key={request._id} className="border-b-2 border-red-500">
                    <td className="border-r-2 border-red-500">
                      {request ? request.recipientName : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request ? request.bloodGroup : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request ? request.date : "Loading..."} at{" "}
                      {request ? request.time : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request ? request.hospitalName : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request ? request.fullAddress : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request && request.status === "inprogress" ? (
                        <>{request?.donorName}</>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request && request.status === "inprogress" ? (
                        <>{request.donorEmail}</>
                      ) : (
                        "N/A"
                      )}
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
                    <td className="border-r-2 border-red-500">
                      {request ? request.donationStatus : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      <NavLink
                        to={`/dashboard/RequestedDonationDetails/${request?._id}`}
                      >
                        <button
                          disabled={userInfo[0]?.status !== "active"}
                          className={`py-2 px-4 ${
                            userInfo[0]?.status !== "active"
                              ? "button-disabled"
                              : "bg-red-500 text-white"
                          } rounded-md`}
                          id={request._id}
                        >
                          View
                        </button>
                      </NavLink>
                    </td>
                    <td className="border-r-2 border-red-500">
                      <NavLink
                        to={`/dashboard/EditDonationRequest/${request?._id}`}
                      >
                        <button
                          className="py-2 px-4 bg-yellow-500 text-white rounded-md"
                          id={request._id}
                        >
                          Edit
                        </button>
                      </NavLink>
                    </td>
                    <td className="border-r-2 border-red-500">
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="py-2 px-4 bg-red-500 text-white rounded-md"
                        id={request._id}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="border-r-2 border-red-500">
                      <button
                        className={`py-2 px-4 ${
                          request.status === "inprogress"
                            ? "bg-green-500 text-white"
                            : "button-disabled"
                        } rounded-md`}
                        onClick={() => handleUpdateStatus(request._id, "done")}
                      >
                        Done
                      </button>
                    </td>
                    <td className="border-r-2 border-red-500">
                      <button
                        className={`py-2 px-4 ${
                          request.status === "inprogress"
                            ? "bg-red-500 text-white"
                            : "button-disabled"
                        } rounded-md`}
                        onClick={() =>
                          handleUpdateStatus(request._id, "canceled")
                        }
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="16" className="text-center text-2xl py-6">
                    No pending donation request available right now
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
          {/* Pagination */}
  <div className="pagination-container mx-auto w-fit mt-6 font-bold text-xl">
    <Pagination
      activePage={activePage}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={filteredRequests.length}
      pageRangeDisplayed={5}
      onChange={(pageNumber) => setActivePage(pageNumber)}
      itemClass="page-item"
      linkClass="page-link"
      
    />
  </div>
    </div>
  );
};

export default MyDonationRequestPage;
