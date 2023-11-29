// import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaLock, FaUnlock, FaUser } from "react-icons/fa";
// import { MdAdminPanelSettings } from "react-icons/md";
// import Swal from "sweetalert2";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const [allUsers, setAllUsers] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [filter, setFilter] = useState("all");
// //   const [error, setError]= useState(null)
//   const [loading, setLoading]= useState(false)

//   useEffect(() => {
//     axiosSecure.get("/users").then((res) => {
//       console.log(res.data);
//       setAllUsers(res.data);
//       setRecords(res.data);
//     });
//   }, [axiosSecure]);

//   const columns = [
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Avatar"}</h1></div>,
//       cell: (row) => <img className="rounded-lg p-1" src={row.photo} alt="avatar" style={{ width: "50px", height: "50px" }} />,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Name"}</h1></div>,
//       selector: (row) => <h1 className="">{row.name}</h1>,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Email"}</h1></div>,
//       selector: (row) => row.email,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Status"}</h1></div>,
//       selector: (row) => row.status,
//       sortable: true,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Role"}</h1></div>,
//       selector: (row) => row.role,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Block"}</h1></div>,
//       cell: (row) => <button disabled={row?.status ==="inactive"} onClick={() => handleBlock(row?._id, row?.role ,"inactive")} className="flex items-center gap-1 bg-red-500 rounded-lg p-2 text-white font-semibold "> <h1><FaLock/></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Block"}</h1></button>,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Unblock"}</h1></div>,
//       cell: (row) => <button disabled={row?.status ==="active"} onClick={() => handleUnblock(row?._id, row?.role , "active")} className="flex items-center gap-1 bg-green-500 rounded-lg p-2 text-white font-semibold"><h1><FaUnlock/></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Unblock"}</h1></button>,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Make Volunteer"}</h1></div>,
//       cell: (row) => <button disabled={row?.role ==="Volunteer"} onClick={() => handleMakeVolunteer(row?._id, "Volunteer", row?.status)} className="flex items-center gap-1 bg-blue-500 rounded-lg p-2 text-white font-semibold"><h1><FaUser/></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Volunteer"}</h1></button>,
//     },
//     {
//       name: <div className=" text-center text-[14px] font-bold py-2 rounded-lg"><h1>{"Make Admin"}</h1></div>,
//       cell: (row) => <button disabled={row?.role ==="Admin"} onClick={() => handleMakeAdmin(row?._id, "Admin", row?.status)} className="flex items-center gap-1 bg-yellow-400 rounded-lg p-2 text-black font-semibold"><h1><MdAdminPanelSettings className="text-xl" /></h1> <h1>{loading ? <span className="loading loading-spinner loading-md"></span> : "Admin"}</h1></button>,
//     },
//   ];

//   const handleBlock = (id,role, status) => {
//     console.log(`Role ${role} Status ${status}`);
//     setLoading(true);
//      const updatedData = {
//     role: role,
//     status: status
//     };
//     console.log(updatedData);
//     axiosSecure
//       .patch(`/users/${id}`, updatedData)
//       .then((res) => {
//           if (res.data.modifiedCount>0) {
//             setLoading(false);
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "User blocked successfully!",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           const delayInSeconds = 2;
//         setTimeout(() => {
//           window.location.reload();
//         }, delayInSeconds * 1000);
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//         setLoading(false);
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: error.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };
//   const handleUnblock = (id,role, status) => {
//     console.log(`Role ${role} Status ${status}`);
//     setLoading(true);
//      const updatedData = {
//     role: role,
//     status: status
//     };
//     console.log(updatedData);
//     axiosSecure
//       .patch(`/users/${id}`, updatedData)
//       .then((res) => {
//           if (res.data.modifiedCount>0) {
//             setLoading(false);
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "User unblocked successfully!",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           const delayInSeconds = 2;
//         setTimeout(() => {
//           window.location.reload();
//         }, delayInSeconds * 1000);
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//         setLoading(false);
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: error.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };
//   const handleMakeVolunteer = (id,role,status) => {
//     console.log(`Role ${role} Status ${status}`);
//     setLoading(true);
//      const updatedData = {
//     role: role,
//     status: status
//     };
//     console.log(updatedData);
//     axiosSecure
//       .patch(`/users/${id}`, updatedData)
//       .then((res) => {
//           if (res.data.modifiedCount>0) {
//             setLoading(false);
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "User made Volnteer successfully!",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           const delayInSeconds = 2;
//         setTimeout(() => {
//           window.location.reload();
//         }, delayInSeconds * 1000);
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//         setLoading(false);
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: error.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };
//   const handleMakeAdmin = (id, role, status) => {
//     console.log(`Role ${role} Status ${status}`);
//     setLoading(true);
//      const updatedData = {
//     role: role,
//     status: status
//     };
//     console.log(updatedData);
//     axiosSecure
//       .patch(`/users/${id}`, updatedData)
//       .then((res) => {
//           if (res.data.modifiedCount>0) {
//             setLoading(false);
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "User made Admin successfully!",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           const delayInSeconds = 2;
//         setTimeout(() => {
//           window.location.reload();
//         }, delayInSeconds * 1000);
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//         setLoading(false);
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: error.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value.toLowerCase());
//     filterRecords(e.target.value.toLowerCase());
//   };

//   const filterRecords = (statusFilter) => {
//     console.log(statusFilter);
//     if (statusFilter === "all") {
//       setRecords(allUsers);
//     } else {
//       const newRecords = allUsers.filter((user) => user.status.toLowerCase().includes(statusFilter));
//       setRecords(newRecords);
//     }
//   };

//   return (
//     <div className="z-[-1]">
//       <h1>{allUsers.length}</h1>
//       <div className="filter-buttons flex gap-4 mx-auto justify-center bg-red-500 w-fit px-8 py-2 rounded-lg mb-8 w-[95vw]">
//         <label htmlFor="statusFilter" className="text-white font-semibold">Filter by Status:</label>
//         <select className="rounded-lg" id="statusFilter" onChange={handleFilterChange} value={filter}>
//           <option value="all">All</option>
//           <option value="active">Active</option>
//           <option value="inactive">Blocked</option>
//         </select>
//       </div>
//       <div className="max-w-[90vw] mx-auto tableData" style={{ overflowX: "auto" }}>
//         <DataTable 
//         columns={columns} 
//         data={records} 
//         selectableRows 
//         fixedHeader 
//         pagination />
//       </div>
//     </div>
//   );
// };

// export default AllUsers;



// // --------------------------------------------------------------------------------------------------------------------------------------

// <div className="mb-4 mx-auto w-[500px] flex items-center relative">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="p-3 rounded-l-md w-full border-2 border-red-500"
//         />
//         {searchText && (
//           <button
//             className="absolute right-0 btn text-red-500 bg-[transparent] hover:bg-[transparent] shadow-none border-none text-3xl"
//             onClick={handleResetSearch}
//           >
//             x
//           </button>
//         )}
//         <button
//           className="absolute -right-20 btn bg-red-500 text-white px-4 border-2 text-xl h-[52px] border-red-500 rounded-none rounded-r-md"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//       </div>