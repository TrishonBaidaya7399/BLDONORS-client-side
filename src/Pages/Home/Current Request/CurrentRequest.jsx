// import PropTypes from 'prop-types';

import { FaHeart } from "react-icons/fa";

const CurrentRequest = () => {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-200 pb-12 lg:px-[200px]">
      <div>
        <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit">
          Who Are Blood Donors
        </h1>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" checked="checked" />
            <div className="collapse-title text-xl font-extrabold font-medium">
              Reduce the ris of the heart attack
            </div>
            <div className="collapse-content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                quidem odit nesciunt modi, minima tenetur voluptatibus suscipit
                repellendus molestiae delectus!
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-extrabold font-medium">
              Lower the risk of cancer
            </div>
            <div className="collapse-content">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
                tempore vero sed nemo illo dolor voluptatum deleniti totam vitae
                eaque?{" "}
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-extrabold font-medium">
              Speed up the healing process
            </div>
            <div className="collapse-content">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ducimus repellendus molestias eveniet doloribus ex alias commodi
                animi, blanditiis quos vero.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit">
          Current blood request
        </h1>
        <ul className="space-y-2">
            <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
                <FaHeart className="text-2xl text-red-500"/> <p>O+, Trishon Baidaya, Chattogram (20,12,2023)</p>
            </li>
            <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
                <FaHeart className="text-2xl text-red-500"/> <p>O+, Trishon Baidaya, Chattogram (20,12,2023)</p>
            </li>
            <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
                <FaHeart className="text-2xl text-red-500"/> <p>O+, Trishon Baidaya, Chattogram (20,12,2023)</p>
            </li>
            <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
                <FaHeart className="text-2xl text-red-500"/> <p>O+, Trishon Baidaya, Chattogram (20,12,2023)</p>
            </li>
            <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
                <FaHeart className="text-2xl text-red-500"/> <p>O+, Trishon Baidaya, Chattogram (20,12,2023)</p>
            </li>
        </ul>
      </div>
    </div>
  );
};

CurrentRequest.propTypes = {};

export default CurrentRequest;
