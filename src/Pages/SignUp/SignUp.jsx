import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import bgImg from "../../../src/images/others/bg.png";
import { AuthContext } from "../../Providers/AuthProvider";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, logOut, googleSignIn } = useContext(AuthContext);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleGoogleSignIn = () => {
    setError(null);
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const userData = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
          role: "Donor",
          status: "active",
        };

        axiosPublic
          .post("/users", userData)
          .then((res) => {
            navigate("/");
            if (res.data.insertedId) {
              Swal.fire({
                title: "Profile Created!",
                text: `${
                  result.user?.displayName ? result.user.displayName : "User"
                } Profile created successfully!`,
                imageUrl: result.user?.photoURL
                  ? result.user.photoURL || result.user.photoURL
                  : "https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                confirmButtonText: "Ok!",
              });
              navigate("/");
            }
          })
          .catch((error) => {
            console.error(error.message);
            setError(error.message);
            Swal.fire({
              title: "User Not Updated!",
              text: error.message,
              icon: "question",
            });
          });
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        Swal.fire({
          title: "User Not Updated!",
          text: error.message,
          icon: "question",
        });
      });
  };

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);

    const status = 'active';

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUser(data.name, res.data.data.display_url)
          .then(() => {
            setLoading(false);
            const userData = {
              name: data.name,
              email: data.email,
              photo: res.data.data.display_url,
              status,
              role: data.role,
              bloodGroup: data.bloodGroup,
              district: data.district,
              upazila: data.upazila,
            };
            axiosPublic.post('/users', userData).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: 'Profile Created!',
                  text: `${
                    result.user?.displayName ? result.user.displayName : 'User'
                  } Profile created successfully!`,
                  imageUrl: result.user?.photoURL
                    ? result.user.photoURL || result.user.photoURL
                    : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
                  imageWidth: 200,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
                  confirmButtonText: 'Ok!',
                });
                reset();
                logOut()
                  .then(() => {
                    setLoading(false);
                    navigate('/login');
                  })
                  .catch((error) => {
                    console.error(error.message);
                    setError(error.message);
                    setLoading(false);
                  });
              }
            });
          })
          .catch((error) => {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      });
  };

  

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <Helmet>
        <title>{`Bldonors | Sign Up`}</title>
      </Helmet>
      <div
        className="hero min-h-screen p-[80px]"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className=" w-full h-full border-[3px] border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <div className="card w-full">
            <h1 className="text-red-500 font-bold text-3xl mx-auto border-b-[3px] border-red-500 py-2 px-8">
              Register Now
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-700 font-semibold">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    name="name"
                    className=" border-2 border-red-500 input input-bordered"
                    required
                  />
                  {errors.name && (
                    <span className="text-red-500">Name field is required</span>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-700 font-semibold">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                    name="email"
                    className=" border-2 border-red-500 input input-bordered"
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      Email field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-700 font-semibold">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      maxLength: 20,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    })}
                    name="password"
                    className=" border-2 border-red-500 input input-bordered"
                    required
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 mt-2">
                      Password field is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 mt-2">
                      Password should be minimum 8 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500 mt-2">
                      Password should not be more than 20 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 mt-2">
                      Password must contain
                      <br />
                      * Minimum 8 characters,
                      <br />
                      * at least one uppercase letter,
                      <br />
                      * one lowercase letter,
                      <br />
                      * one number and <br />* one special character
                    </span>
                  )}
                </div>
                {error && <span className="text-red-500">{error}</span>}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-700 font-semibold">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === watch("password"),
                    })}
                    name="confirmPassword"
                    className="border-2 border-red-500 input input-bordered"
                    required
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500 mt-2">
                      Confirm Password field is required
                    </span>
                  )}
                  {errors.confirmPassword?.type === "validate" && (
                    <span className="text-red-500 mt-2">
                      Passwords do not match
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
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
                  >
                    <option value="Blood Group" disabled selected>
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
                    <span className="text-red-500">
                      Blood group is required
                    </span>
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
                    value={selectedDistrict}
                    required
                  >
                    <option value="" disabled selected>
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
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
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
                    <option value="Select Upazila" disabled selected>
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
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-700 font-semibold">
                      Select Role
                    </span>
                  </label>
                  <select
                    {...register("role", { required: true })}
                    name="role"
                    className="border-2 border-red-500 input input-bordered overflow-y-auto max-h-[30vh]"
                    required
                  >
                    <option value="" selected disabled>
                      Select Role
                    </option>
                    <option value="Donor">Donor</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                  {errors.role && (
                    <span className="text-red-500">Role is required</span>
                  )}
                </div>

                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-gray-700 font-semibold">
                      Upload Profile Image
                    </span>
                  </label>
                  <input
                    {...register("image", { required: true })}
                    required
                    type="file"
                    className="file-input w-full max-w-xs rounded-md bg-gray-100"
                  />
                </div>
              </div>
              <div className="form-control w-full mt-6">
                <input
                  type="submit"
                  value={loading ? "Loading..." : "Sign Up"}
                  className="btn bg-red-500 bg-opacity-70 text-white"
                ></input>
              </div>
              <p className="text-red-500 mx-auto">
                Already registered?{" "}
                <Link to="/login">
                  <span className="font-bold">Go to log in</span>
                </Link>
              </p>
              <div className="flex flex-col items-center gap-3 mx-auto">
                <p className="text-gray-700 font-semibold">Or sign up with</p>
                <div className="flex gap-6">
                  <div className="rounded-full p-2 border-2 border-red-500 hover:border-red-500 text-red-500 hover:text-gray-700 duration-200">
                    <FaFacebookF />
                  </div>
                  <div
                    onClick={handleGoogleSignIn}
                    className="rounded-full p-2 border-2 border-red-500 hover:border-red-500 text-red-500 hover:text-gray-700 duration-200"
                  >
                    <BsGoogle />
                  </div>
                  <div className="rounded-full p-2 border-2 border-red-500 hover:border-red-500 text-red-500 hover:text-gray-700 duration-200">
                    <BsGithub />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

SignUp.propTypes = {
  user: PropTypes.node,
};

export default SignUp;
