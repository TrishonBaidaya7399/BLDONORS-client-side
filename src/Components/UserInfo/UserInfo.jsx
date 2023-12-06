import { useState, useEffect } from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";


const UserInfo = () => {
  const [userInfo, refetch] = useUserInfo();
  const [districtName, setDistrictName] = useState("N/A");
  const [upazilaName, setUpazilaName] = useState("N/A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const districtsResponse = await fetch("/districts.json");
        const upazilasResponse = await fetch("/upazilas.json");

        const districtsData = await districtsResponse.json();
        const upazilasData = await upazilasResponse.json();

        const district = districtsData.find((d) => d.id === userInfo?.district);
        const upazila = upazilasData.find((u) => u.id === userInfo?.upazila);

        setDistrictName(district?.name || "N/A");
        setUpazilaName(upazila?.name || "N/A");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    refetch();
    fetchData();
  }, [userInfo, refetch]);

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold md:px-4 border-b-2 border-red-500 w-fit">
          {userInfo?.role} Profile
        </h1>
      </div>
      <div className="rounded-lg border-2 border-red-500 md:p-12 my-12 md:mx-[100px] lg:mx-[200px] flex flex-col-reverse lg:flex-row-reverse justify-center gap-12 bg-red-500 bg-opacity-20">
        <div className="infoPart flex-flex col gap-4 px-2">
          <h1 className="text-2xl">
            <span className="text-red-500 text-2xl font-bold mr-2">Name:</span>
            {userInfo?.name}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">Email:</span>
            {userInfo?.email}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">Status:</span>
            {userInfo?.status}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">
              Blood Group:
            </span>
            {userInfo?.bloodGroup}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">
              District:
            </span>
            {districtName}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">
              Upazila:
            </span>
            {upazilaName}
          </h1>
          <Link to="/dashboard/editProfile">
          <button className="bg-red-500 my-4 lg:my-0 px-8 py-2 rounded-lg text-white mt-4 font-bold">
          <div className="flex gap-2 items-center">
            <div>
              <p>Edit Profile Info </p>
            </div>
            <div>
              <FaEdit/>
            </div>
          </div>
          </button>
            </Link>
        </div>
        <div
          className="mx-auto lg:mx-0  mt-4 lg:mt-0  rounded-lg border-2 bg-white border-red-500 w-[300px] h-[300px]"
          style={{
            backgroundImage: `url(${userInfo?.photo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src="https://i.ibb.co/6JhvNW2/frame.png" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
