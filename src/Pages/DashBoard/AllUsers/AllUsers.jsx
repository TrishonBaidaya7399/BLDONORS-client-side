import { useEffect, useState } from "react";
import useUserInfo from "../../../Hooks/useUserInfo";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";


const AllUsers = () => {
  const userInfo = useUserInfo();
  const [users, setUsers] = useState([]);
  console.log(users)
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  // Pagination stats
  const [activePage, setActivePage] = useState(1);
const itemsPerPage = 10;
const startIndex = (activePage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;


  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((result) => {
        console.log(result.data);
        setUsers(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching donation request:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [activePage]);


  //   console.log("UserInfo Status: ", userInfo[0]?.status);
  // Function to handle updating donation status
  const handleBlock = (id,role, status) => {
    console.log(`Role ${role} Status ${status}`);
    setLoading(true);
     const updatedData = {
    role: role,
    status: status
    };
    console.log(updatedData);
    axiosSecure
      .patch(`/users/${id}`, updatedData)
      .then((res) => {
          if (res.data.modifiedCount>0) {
            setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User blocked successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          const delayInSeconds = 2;
        setTimeout(() => {
          window.location.reload();
        }, delayInSeconds * 1000);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleUnblock = (id,role, status) => {
    console.log(`Role ${role} Status ${status}`);
    setLoading(true);
     const updatedData = {
    role: role,
    status: status
    };
    console.log(updatedData);
    axiosSecure
      .patch(`/users/${id}`, updatedData)
      .then((res) => {
          if (res.data.modifiedCount>0) {
            setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User unblocked successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          const delayInSeconds = 2;
        setTimeout(() => {
          window.location.reload();
        }, delayInSeconds * 1000);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleMakeVolunteer = (id,role,status) => {
    console.log(`Role ${role} Status ${status}`);
    setLoading(true);
     const updatedData = {
    role: role,
    status: status
    };
    console.log(updatedData);
    axiosSecure
      .patch(`/users/${id}`, updatedData)
      .then((res) => {
          if (res.data.modifiedCount>0) {
            setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User made Volnteer successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          const delayInSeconds = 2;
        setTimeout(() => {
          window.location.reload();
        }, delayInSeconds * 1000);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleMakeAdmin = (id, role, status) => {
    console.log(`Role ${role} Status ${status}`);
    setLoading(true);
     const updatedData = {
    role: role,
    status: status
    };
    console.log(updatedData);
    axiosSecure
      .patch(`/users/${id}`, updatedData)
      .then((res) => {
          if (res.data.modifiedCount>0) {
            setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User made Admin successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          const delayInSeconds = 2;
        setTimeout(() => {
          window.location.reload();
        }, delayInSeconds * 1000);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  // Function to filter requests based on status
  const filteredRequests = users.filter((user) => {
    if (filterStatus === "all") {
      return true; // Show all requests
    }
    return user.status === filterStatus;
  });
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

// console.log("Filtered Data: ", filteredRequests);


return (
    <div className="mx-auto mb-12">
      <div className="flex mx-auto pt-12 text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
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
          <option value="active">Active</option>
          <option value="inactive">Blocked</option>
        </select>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-w-[90vw] max-h-[80vh] mx-12 -mt-6  rounded-md border-[5px] border-red-500">
        {loading ? (
          <p className="text-center text-2xl py-6">
            <span className="loading loading-spinner loading-lg"></span>
          </p>
        ) : (
          <table className="table">
            {/* head */}
            <thead className="bg-red-500 text-lg text-white font-semibold border-2 border-red-500">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Block User</th>
                <th>Unblock User</th>
                <th>Make Volunteer</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold bg-red-500 bg-opacity-20 border-2 border-red-500">
              {/* rows */}
              {users ? (
                filteredRequests.slice(startIndex, endIndex).map((user) => (
                  <tr key={user._id} className="border-b-2 border-red-500">
                    <td className="border-r-2 border-red-500">
                     <img src={user?.photo} alt="" className="w-12 h-12 rounded-lg border-2 border-red-500"/>
                    </td>
                    <td className="border-r-2 border-red-500">
                      {user ? user?.name : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {user ? user?.email : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {user ? user?.status : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {user ? user?.role : "Loading..."}
                    </td>
                    <td className="border-r-2 border-red-500">
                    <button disabled={user?.status ==="inactive"} onClick={() => handleBlock(user?._id, user?.role ,"inactive")} className="flex items-center gap-1 bg-red-500 rounded-lg p-2 text-white font-semibold "> <h1><FaLock/></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Block"}</h1></button>
                    </td>
                    <td className="border-r-2 border-red-500">
                    <button disabled={user?.status ==="active"} onClick={() => handleUnblock(user?._id, user?.role , "active")} className="flex items-center gap-1 bg-green-500 rounded-lg p-2 text-white font-semibold"><h1><FaUnlock/></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Unblock"}</h1></button>
                    </td>
                    <td className="border-r-2 border-red-500">
                    <button disabled={user?.role ==="Volunteer"} onClick={() => handleMakeVolunteer(user?._id, "Volunteer", user?.status)} className="flex items-center gap-1 bg-blue-500 rounded-lg p-2 text-white font-semibold"><h1><FaUser/></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Volunteer"}</h1></button>
                    </td>
                    <td className="border-r-2 border-red-500">
                    <button disabled={user?.role ==="Admin"} onClick={() => handleMakeAdmin(user?._id, "Admin", user?.status)} className="flex items-center gap-1 bg-yellow-400 rounded-lg p-2 text-black font-semibold"><h1><MdAdminPanelSettings className="text-xl" /></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Admin"}</h1></button>
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

export default AllUsers;
