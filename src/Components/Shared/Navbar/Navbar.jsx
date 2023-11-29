// import PropTypes from 'prop-types';
import { Link, NavLink } from "react-router-dom";
import logo from "../../../images/logo/logo.png";
import { FaSearch } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useUserInfo from "../../../Hooks/useUserInfo";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userInfo] = useUserInfo();
  const [loading, setLoading] = useState(false);
  const navItems = (
    <div className="lg:flex gap-6 font-semibold text-black">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
        to="/"
      >
        <li>HOME</li>
      </NavLink>
      <NavLink
      to="/donationRequests"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
      >
        <li>DONATION REQUEST</li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
        to="/blog"
      >
        <li>BLOG</li>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "block md:hidden  text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "block md:hidden  text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
        to="/cart"
      >
        <li>FUNDING</li>
      </NavLink>
    </div>
  );
  // Logout
  const handleLogOut = () => {
    setLoading(true);
    logOut()
      .then(() => {
        console.log("Logged Out Successfully!");
        setLoading(false);
        Swal.fire({
          title: "Logged out!",
          text: `${
            user?.displayName ? user.displayName : "User"
          } logged out successfully!`,
          imageUrl: user?.photoURL
            ? user.photoURL || user.photoURL
            : "https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonText: "Ok!",
        });
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div className="navbar lg:px-[100px] drop-shadow-lg shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="text-2xl text-red-500" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <img className="w-[30px]" src={logo} alt="" />
          <p className="text-red-500 font-semibold text-xl">BLdonors</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link to="/search">
            <FaSearch className="text-2xl text-red-500 mr-4" />
            </Link>
            <div
              className="avatar btn bg-[transparent] border-none shadow-none hover:bg-[transparent] border-none shadow-none"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <div className="w-10 rounded-full border-[3px] drop-shadow-lg border-red-500">
                <img src={user?.photoURL} />
              </div>
            </div>
          </>
        ) : (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 border-b-[3px] pb-1 border-[transparent]  flex gap-2"
                  : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300 flex gap-2"
              }
              to="/login"
            >
             <FiLogIn className="text-2xl text-red-500"/> <p>LOGIN</p>
            </NavLink>
          </>
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle text-white"
      >
        <div className="modal-box bg-black bg-opacity-80 border-2 border-red-500 w-[332px] h-[500px] mx-auto">
          <div className="rounded-full w-[150px] h-[150px] bg-[white] mx-auto">
            <img
              className="rounded-full border-2 border-red-500 h-full w-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <h1 className="text-2xl text-white font-bold text-center pt-4">
            {user?.displayName}
          </h1>
          <h1 className="text-lg text-white text-center pt-4">
            Email: {user?.email}
          </h1>
          <h1 className="text-lg text-white text-center pt-4">
            Role: {userInfo?.role}
          </h1>
          <div className="modal-action flex justify-center">
            
            <form method="dialog" className="flex gap-6">
              {/* if there is a button in form, it will close the modal */}
              <button
              onClick={handleLogOut}
              className="btn bg-white text-xl text-red-500 font-bold bg-opacity-60 border-red-500"
            >
              {loading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Log Out"
              )}
            </button>
            <NavLink
              className="btn bg-white text-xl text-red-500 font-bold bg-opacity-60 border-red-500"
              to={
                userInfo?.role === "Volunteer"
                  ? "/dashboard/volunteerHome"
                  : userInfo?.role === "Admin"
                  ? "/dashboard/adminHome"
                  : userInfo?.role === "Donor"
                  ? "/dashboard/donorHome"
                  : "/dashboard" // Default to "/dashboard" if the role is not recognized
              }
            >
              <button>
              DASHBOARD
            </button>
            </NavLink>
              <button
              className="btn bg-white text-xl text-red-500 font-bold bg-opacity-60 border-red-500"
            >
              {loading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Exit"
              )}
            </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
