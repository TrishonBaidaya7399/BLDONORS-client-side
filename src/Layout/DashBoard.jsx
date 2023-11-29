// import PropTypes from 'prop-types';
import { CgProfile  } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineContentPaste } from "react-icons/md";
import { MdKeyboardReturn  } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
import useUserInfo from "../Hooks/useUserInfo";
import { FaHome, FaUsers } from "react-icons/fa";


const DashBoard = () => {
  const [userInfo, refetch] = useUserInfo();
  console.log("UserInfo inside dashboard: ",userInfo);
  console.log("UserInfo Role inside dashboard: ",userInfo.role);
  refetch();
  return (
    <div>
      <div className="drawer z-20">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-[transparent] border-none shadow-none hover:bg-[transparent] drawer-button"
          >
            <GiHamburgerMenu className="text-4xl text-red-500" />
          </label>
          <Outlet></Outlet>
        </div>

        {/*<--------------------- Drawer side ---------------------> */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="z-20 menu p-4 w-80 min-h-full bg-red-500 bg-opacity-90 drop-shadow-lg text-white pt-8">
            {/* Sidebar content here */}
            <div className="flex flex-row gap-2 items-center drop-shadow-lg mb-4">
              <div className="rounded-full bg-black border-2 border-white p-1">
                <img
                  src="../../src/images/logo/logo.png"
                  className="w-[30px] h-[30px]"
                />
              </div>
              <h1 className="text-white text-3xl font-bold">BLDONORS</h1>
            </div>
            <h1 className="text-white font-bold text-xl ml-6 mb-6">Welcome {userInfo?.name}</h1>

            {/* <===================Admin=================> */}

            {userInfo?.role === "Admin" && (
             <>
              <Link
              to="/dashboard/adminHome"
              className="text-white text-md font-bold"
            >
              <li className="flex flex-row  items-center">
                <div>
                  <FaHome className="text-3xl 2ext-white -mr-6" />
                </div>{" "}
                <p>Admin Home</p>
              </li>
            </Link>
              <Link
                to="/dashboard/adminProfile"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <CgProfile className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>Admin Profile</p>
                </li>
              </Link>
              <Link
                to="/dashboard/all-users"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <FaUsers className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>All Users</p>
                </li>
              </Link>
              <Link
                to="/dashboard/all-blood-donation-request"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <BiSolidDonateBlood className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>All Blood Donation Requests</p>
                </li>
              </Link>
              <Link
                to="/dashboard/content-management"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <MdOutlineContentPaste className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>Content Management</p>
                </li>
              </Link>
             </>
            )}

            {/* <===================Volunteer=================> */}

            {userInfo?.role === "Volunteer" && (
              <>
              <Link
                to="/dashboard/volunteerHome"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <FaHome className="text-3xl 2ext-white -mr-6" />
                  </div>{" "}
                  <p>Volunteer Home</p>
                </li>
              </Link>
              <Link
                to="/dashboard/volunteerProfile"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <CgProfile  className="text-2xl text-white -mr-6" />
                  </div>{" "}
                  <p>Volunteer Profile</p>
                </li>
              </Link>
              <Link
                to="/dashboard/createDonationRequest"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <BiSolidDonateBlood className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>Create New Donation</p>
                </li>
              </Link>
              <Link
                to="/dashboard/volunteer-all-blood-donation-request"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <BiSolidDonateBlood className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>All Blood Donation Requests</p>
                </li>
              </Link>
              <Link
                to="/dashboard/content-management"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <MdOutlineContentPaste className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>Content Management</p>
                </li>
              </Link>
              </>
            )}

            {/* <===================Donor=================> */}

            {userInfo?.role === "Donor" && (
             <>
              <Link
              to="/dashboard/donorHome"
              className="text-white text-md font-bold"
            >
              <li className="flex flex-row  items-center">
                <div>
                  <FaHome className="text-3xl 2ext-white -mr-6" />
                </div>{" "}
                <p>Donor Home</p>
              </li>
            </Link>
              <Link
                to="/dashboard/donorProfile"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <CgProfile  className="text-2xl text-white -mr-6" />
                  </div>{" "}
                  <p>Donor Profile</p>
                </li>
              </Link>
              <Link
                to="/dashboard/create-donation-request"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <CgProfile  className="text-2xl text-white -mr-6" />
                  </div>{" "}
                  <p>Create Request To Donate</p>
                </li>
              </Link>
              <Link
                to="/dashboard/my-donation-requests"
                className="text-white text-md font-bold"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <CgProfile  className="text-2xl text-white -mr-6" />
                  </div>{" "}
                  <p>My Donation Requests</p>
                </li>
              </Link>
             </>
            )}
            <Link
                to="/"
                className="text-white text-lg border-2 border-white font-bold mt-12 bg-black rounded-lg w-fit px-4"
              >
                <li className="flex flex-row  items-center">
                  <div>
                    <MdKeyboardReturn className="text-3xl text-white -mr-6" />
                  </div>{" "}
                  <p>Return to Home</p>
                </li>
              </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = {};

export default DashBoard;
