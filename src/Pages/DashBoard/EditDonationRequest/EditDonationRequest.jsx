import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUserInfo from "../../../Hooks/useUserInfo";
import { useLoaderData } from "react-router-dom";

const EditDonationRequest = () => {
    const requestedData = useLoaderData()
  const [selectedDistrict, setSelectedDistrict] = useState(requestedData?.district);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const axiosPublic = useAxiosPublic();
  const userInfo = useUserInfo();

  console.log("These are the data which are need to be edited: ", requestedData );

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
    setError(true);
    setLoading(true);

    const donationRequestData = {
    requesterName: data.requesterName,
    requesterEmail: data.requesterEmail,
    recipientName: data.name,
    hospitalName: data.hospitalName,
    fullAddress: data.fullAddress,
    bloodGroup: data.bloodGroup,
    district: data.district,
    upazila: data.upazila,
    date: data.date,
    time: data.time,
    donationStatus: data.donationStatus,
    status: "pending",
    };
    console.log(donationRequestData);
    console.log("ID: ", requestedData?._id);

    axiosPublic
      .put(`/donationRequest/${requestedData?._id}`, donationRequestData)
      .then((res) => {
          if (res.data.modifiedCount>0) {
            setError(false);
            setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New Donation Request added successfully!",
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
          title: "Failed to add new Donation Request added!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    fetch("/public/districts.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error))
      .finally(() => setLoading(false));

    fetch("/public/upazilas.json")
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
    <div className="flex flex-col border-[3px] rounded-lg p-12 mb-12 lg:mx-[200px] border-red-500 bg-red-500 bg-opacity-20">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold pb-2 border-b-[3px] border-red-500 px-4 w-fit">
          Edit Your Donation Request
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Requester Name
            </span>
          </label>
          <input
            type="text"
            value={userInfo[0]?.name}
            placeholder={userInfo[0]?.name}
            {...register("requesterName", { required: true })}
            name="requesterName"
            className=" border-2 border-red-500 input input-bordered"
            required
            readOnly
          />
    
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
            Requester Email
            </span>
          </label>
          <input
            type="email"
            value={userInfo[0]?.email}
            placeholder={userInfo[0]?.email}
            {...register("requesterEmail", { required: true })}
            name="requesterEmail"
            className=" border-2 border-red-500 input input-bordered"
            required
            readOnly
          />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Recipient Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            name="name"
            className=" border-2 border-red-500 input input-bordered"
            required
            defaultValue={requestedData?.recipientName}
          />
          {errors.name && (
            <span className="text-red-500">Name field is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Hospital Name
            </span>
          </label>
          <input
            type="text"
            placeholder="hospitalName"
            className=" border-2 border-red-500 input input-bordered"
            required
            defaultValue={requestedData?.hospitalName}
            {...register("hospitalName", { required: true })}
          />
          {errors.hospitalName && (
            <span className="text-red-500">Hospital Name is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Full Address
            </span>
          </label>
          <input
            type="text"
            placeholder="fullAddress"
            className=" border-2 border-red-500 input input-bordered"
            required
            defaultValue={requestedData?.fullAddress}
            {...register("fullAddress", { required: true })}
          />
          {errors.fullAddress && (
            <span className="text-red-500">Full Address is required</span>
          )}
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
            defaultValue={requestedData?.bloodGroup}
          >
            <option value="" defaultValue="Select Blood Group">
              Select Blood Group
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
              Donation Date
            </span>
          </label>
          <input
            type="date"
            name="date"
            placeholder="DonationDate"
            className=" border-2 border-red-500 input input-bordered"
            required
            defaultValue={requestedData?.date}
            {...register("date", { required: true })}
          />
          {errors.date && (
            <span className="text-red-500">Donation Date is required</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Donation Time
            </span>
          </label>
          <input
            type="time"
            name="time"
            placeholder="Donation Time"
            className=" border-2 border-red-500 input input-bordered"
            required
            defaultValue={requestedData?.time}
            {...register("time", { required: true })}
          />
          {errors.time && (
            <span className="text-red-500">Donation Date is required</span>
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
            defaultValue={selectedDistrict}
            required
          >
            <option value="" defaultValue="Select District">
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
        <div className="form-control">
        <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Type Blood Donation Request Reason
            </span>
          </label>
            <textarea 
            type="text" 
            name="donationStatus"
            placeholder="Please describe the reason of Blood request"
            className="border-2 border-red-500 input input-bordered overflow-y-auto max-h-[30vh] h-[200px]"
            {...register('donationStatus', { required: true })} defaultValue={requestedData?.donationStatus}/>
            {errors.donationStatus && <span className="text-red-500">Donation Status is required</span>}
        </div>
        <div className="form-control w-full mt-6">
          <input
            type="submit"
            value={loading ? "Loading..." : "Update Request"}
            className="btn bg-red-500 font-semibold bg-opacity-70 text-white"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
