import { useState, useEffect } from "react";
import useUserInfo from "../../Hooks/useUserInfo";

const UserInfo = () => {
  const [userInfo, refetch] = useUserInfo();
  const [districtName, setDistrictName] = useState("N/A");
  const [upazilaName, setUpazilaName] = useState("N/A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const districtsResponse = await fetch("/public/districts.json");
        const upazilasResponse = await fetch("/public/upazilas.json");

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
            <h1 className="text-3xl font-bold px-4 border-b-2 border-red-500 w-fit">{userInfo?.role} Profile</h1>
        </div>
      <div className="rounded-lg border-2 border-red-500 p-12 my-12 mx-[200px] flex flex-col-reverse lg:flex-row-reverse justify-center gap-12 bg-red-500 bg-opacity-20">
        <div className="infoPart flex-flex col gap-4">
          <h1 className="text-2xl">
            <span className="text-red-500 text-2xl font-bold mr-2">Name:</span>
            {userInfo?.name}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">Email:</span>
            {userInfo?.role}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">Status:</span>
            {userInfo?.status}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">Blood Group:</span>
            {userInfo?.bloodGroup}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">District:</span>
            {districtName}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-500 text-xl font-bold mr-2">Upazila:</span>
            {upazilaName}
          </h1>
        </div>
        <div className="rounded-lg border-2 bg-white border-red-500 w-[300px] h-[300px]">
            <img src={userInfo?.photo} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
