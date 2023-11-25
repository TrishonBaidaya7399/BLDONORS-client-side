// import PropTypes from 'prop-types';
import { FaMailBulk, FaPhone } from "react-icons/fa";
import doctor from "../../../images/featured/card images/doctor.png"
const ContactUs = () => {
  return (
    <div className="bg-gray-200 pt-12">
        <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Please Contact Us
      </h1>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="drop-shadow-[0_35px_35px_rgba(244,67,54,0.50)]">
            <img className="drop-shadow-lg w-[600px] h-[400px] -mb-12" src={doctor} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="phone"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  required
                />
              </div>
              <h1>Please contact us on this number</h1>
              <div className="flex gap-2 items-center">
              <FaPhone className="text-xl text-red-500"/>
              <p>+880163613254</p>
              </div>
              <div className="flex gap-2 items-center">
              <FaMailBulk className="text-xl text-red-500"/>
              <p>bldonors.org@gmail.com</p>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-black bg-opacity-80 border-2 border-red-500 rounded-lg text-xl font-bold text-red-500">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactUs.propTypes = {};

export default ContactUs;
