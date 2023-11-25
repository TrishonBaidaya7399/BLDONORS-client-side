// import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import logo from "../../../images/logo/logo.png";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
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
        className={({ isActive }) =>
          isActive
            ? "text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
        to="/contact"
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
            ? "text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
        to="/login"
      >
        <li>LOGIN</li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-red-500 border-b-[3px] pb-1 border-[transparent] "
            : "text-black border-b-[3px] pb-1 border-[transparent] hover:border-b-[3px] hover:border-red-500 duration-300"
        }
        to="/dashboard"
      >
        <li>DASHBOARD</li>
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
  return (
    <div className="navbar lg:px-[100px] drop-shadow-lg shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
           <GiHamburgerMenu className="text-2xl text-red-500"/>
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
        <FaSearch className="text-2xl text-red-500 mr-4" />
        <div
          className="avatar btn bg-[transparent] border-none shadow-none hover:bg-[transparent] border-none shadow-none"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <div className="w-10 rounded-full border-[3px] drop-shadow-lg border-red-500">
            <img src={logo} />
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle text-white">
        <div className="modal-box bg-black bg-opacity-80 border-2 border-red-500 w-[332px] h-[500px] mx-auto">
          <div className="rounded-full w-[150px] h-[150px] bg-[white] mx-auto">
            <img className="rounded-full border-2 border-red-500 h-full w-full" src={logo} alt="" />
          </div>
          <h1 className="text-2xl text-white font-bold text-center pt-4">Trishon Baidaya Shontu</h1>
          <h1 className="text-lg text-white text-center pt-4">Email: shukantobaidya2018@gmail.com</h1>
          <h1 className="text-lg text-white text-center pt-4">Role: Admin</h1>
          <div className="modal-action flex justify-center">
          <button className="btn bg-white text-xl text-red-500 font-bold bg-opacity-60 border-red-500">logout</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-white text-xl text-red-500 font-bold bg-opacity-60 border-red-500">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
