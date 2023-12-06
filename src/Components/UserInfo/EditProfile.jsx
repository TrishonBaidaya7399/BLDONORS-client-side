import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUserInfo from "../../Hooks/useUserInfo";

const EditProfile = () => {
    const userInfo = useUserInfo();
  const [selectedDistrict, setSelectedDistrict] = useState(userInfo[0]?.district);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const axiosPublic = useAxiosPublic();
  console.log("Users Data: ", userInfo[0]);

  console.log("These are the data which are need to be edited: ", userInfo[0] );
  console.log(selectedDistrict);
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();
  
  console.log("ID: ", userInfo[0]?._id);
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
    setError(true);
    setLoading(true);

    const updatedData = {
        name: data.name,
        email: data.email,
    bloodGroup: data.bloodGroup,
    district: data.district,
    upazila: data.upazila,
    status: userInfo[0].status
    };
    console.log(updatedData);

    axiosPublic
      .put(`/users/${userInfo[0]?._id}`, updatedData)
      .then((res) => {
          if (res.data.modifiedCount>0) {
            setError(false);
            setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError(false);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "User update request failed!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    fetch("/districts.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error))
      .finally(() => setLoading(false));

    fetch("/upazilas.json")
      .then((response) => response.json())
      .then((data) => setUpazilas(data))
      .catch((error) => console.error("Error fetching upazilas:", error));
  }, []);

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);

    const filteredUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrictId
    );
    setUpazilas(filteredUpazilas);
  };

  return (
    <div className="flex flex-col border-[3px] rounded-lg p-2 md:p-12 mb-12 lg:mx-[200px] border-red-500 bg-red-500 bg-opacity-20">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-center pb-2 border-b-[3px] border-red-500 px-4 w-fit">
          Edit Your Donation Request
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Your Name
            </span>
          </label>
          <input
            type="text"
            defaultValue={userInfo[0]?.name}
            placeholder={userInfo[0]?.name}
            {...register("name", { required: true })}
            name="name"
            className=" border-2 border-red-500 input input-bordered"
            required
          />
    
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
            Your Email
            </span>
          </label>
          <input
            type="email"
            defaultValue={userInfo[0]?.email}
            placeholder={userInfo[0]?.email}
            {...register("email", { required: true })}
            name="email"
            className=" border-2 border-red-500 input input-bordered"
            required
            readOnly
          />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Blood Group
            </span>
          </label>
          <select
            {...register("bloodGroup", { required: true })}
            name="bloodGroup"
            className="border-2 border-red-500 input input-bordered"
            required
            defaultValue={userInfo[0]?.bloodGroup}
          >
            <option value="" defaultValue={userInfo[0]?.bloodGroup}>
            {userInfo[0]?.bloodGroup}
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && (
            <span className="text-red-500">Blood group is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              District
            </span>
          </label>
          <select
            {...register("district", { required: true })}
            name="district"
            className="border-2 border-red-500 input input-bordered overflow-y-auto max-h-[30vh]"
            onChange={handleDistrictChange}
            defaultValue={userInfo[0].district}
            required
          >
            <option value="" defaultValue={userInfo[0].district}>
              Select District
            </option>
            {loading ? (
              <option value="" disabled>
                Loading districts...
              </option>
            ) : (
              districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))
            )}
          </select>
          {errors.district && (
            <span className="text-red-500">District is required</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Upazila
            </span>
          </label>
          <select
            {...register("upazila", { required: true })}
            name="upazila"
            className="border-2 border-red-500 input input-bordered overflow-y-auto max-h-[30vh]"
            required
          >
            <option value="" defaultValue="Select Upazila">
              Select Upazila
            </option>
            {loading ? (
              <option value="" disabled>
                Loading upazilas...
              </option>
            ) : (
              upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))
            )}
          </select>
          {errors.upazila && (
            <span className="text-red-500">Upazila is required</span>
          )}
          {error && (
            <span className="text-red-500">Failed to new donation request</span>
          )}
        </div>
        <div className="form-control w-full mt-6">
          <input
            type="submit"
            value={loading ? "Loading..." : "Update Profile"}
            className="btn bg-red-500 font-semibold bg-opacity-70 text-white"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
