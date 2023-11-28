// import PropTypes from 'prop-types';

import useUserInfo from "../../../Hooks/useUserInfo";
import RequestedDonations from "./requestedDonations";

const DonorHome = () => {
    const [userInfo, refetch] = useUserInfo();
    // console.log(userInfo);
    refetch();
    return (
        <div className="">
            <div>
            <h1 className="text-5xl font-bold text-center">Welcome to Dashboard {userInfo?.name}</h1>
            </div>
            <div>
                <RequestedDonations/>
            </div>
        </div>
    );
};

DonorHome.propTypes = {
    
};

export default DonorHome;