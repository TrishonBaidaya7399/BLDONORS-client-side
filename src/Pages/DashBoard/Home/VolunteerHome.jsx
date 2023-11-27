// import PropTypes from 'prop-types';

import useUserInfo from "../../../Hooks/useUserInfo";

const VolunteerHome = () => {
    const [userInfo, refetch] = useUserInfo();
    console.log(userInfo);
    refetch();
    return (
        <div className="lg:mx-12">
            <h1 className="text-5xl font-bold">Welcome to Dashboard {userInfo?.name}</h1>
        </div>
    );
};

VolunteerHome.propTypes = {
    
};

export default VolunteerHome;