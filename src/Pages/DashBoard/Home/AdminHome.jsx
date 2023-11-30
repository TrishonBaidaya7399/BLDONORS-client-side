// import PropTypes from 'prop-types';

import AdminStats from "../../../Components/Stats/AdminStats";
import useUserInfo from "../../../Hooks/useUserInfo";
import DonationRequest from "../DonationRequest/DonationRequest";


const AdminHome = () => {
    const [userInfo, refetch] = useUserInfo();
    console.log(userInfo);
    refetch();
    return (
        <div className="mx-4 lg:mx-12">
            <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-center">Welcome to Dashboard {userInfo?.name}</h1>
            </div>
            <div>
                <AdminStats/>
            </div>
            <div className="-mx-4 w-[95vw]">
                <DonationRequest/>
            </div>
        </div>
    );
};

AdminHome.propTypes = {
    
};

export default AdminHome;