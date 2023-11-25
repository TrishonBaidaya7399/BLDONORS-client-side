// import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';

const DashBoard = () => {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn bg-[transparent] border-none shadow-none hover:bg-[transparent] drawer-button">
           <GiHamburgerMenu className='text-2xl text-red-500'/>
          </label>
        </div>

        {/* Drawer side ---------------------> */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-red-500 text-white">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = {};

export default DashBoard;
