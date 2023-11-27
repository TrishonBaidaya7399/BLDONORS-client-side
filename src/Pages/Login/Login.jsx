// import PropTypes from 'prop-types';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { BsGoogle, BsGithub } from "react-icons/bs";
import bgImg from "../../../src/images/others/bg.png";
import authenticationImg from "../../../src/images/others/login.png";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2';
// import "./Login.css"
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

    const handleGoogleSignIn =()=>{
      googleSignIn()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: 'Logged In!',
          text: `${result.user?.displayName ? result.user.displayName : 'User'} Logged In successfully!`,
          imageUrl: result.user?.photoURL ? result.user.photoURL || result.user.photoURL : 'https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonText: 'Ok!',
        })
        navigate(from , {replace: true});
        })
    }

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log("Logged in successfully!", result.user);
        Swal.fire({
          title: "Logged In!",
          text: `${
            result.user?.displayName ? result.user.displayName : "User"
          } logged in successfully!`,
          imageUrl: result.user?.photoURL
            ? result.user.photoURL || result.user.photoURL
            : "https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonText: "Ok!",
        });
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setErrors(error.message);
      });
  };

  const handleValidateCaptcha = (e) => {
    setErrors("");
    setDisable(true);
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
    } else {
      setErrors("Invalid Captcha entry!");
      setDisable(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`BISTRO BOSS | Log In`}</title>
      </Helmet>
      <div
        className="hero min-h-screen p-[80px] "
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse w-full h-full border-[3px] border-red-500 rounded-lg">
          <div className="text-center lg:text-left drop-shadow-[0_35px_35px_rgba(244,67,54,0.50)]">
            <img src={authenticationImg} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg ">
            <form onSubmit={handleLogin} className="card-body text-gray-700">
              <h1 className="text-red-500 font-bold text-3xl mx-auto">LOGIN</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="border-2 border-red-500 input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="border-2 border-red-500 mb-6 input input-bordered"
                  required
                />
                <div className="captcha-container">
                  <LoadCanvasTemplate className="w-full" />
                </div>
                <input
                  type="text"
                  onBlur={handleValidateCaptcha}
                  name="captcha"
                  placeholder="Type the captcha"
                  className="input input-bordered mt-3"
                  required
                />
                {/* <button type='button' onClick={handleValidateCaptcha}  className="btn btn-outline btn-xs bg-black bg-opacity-30 text-white mt-3 w-fit">Validate Captcha</button> */}
              </div>
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-red-500 font-semibold"
                >
                  Forgot password?
                </a>
              </label>
              <div className="form-control mt-0">
                {errors && <span className="text-red-500">{errors}</span>}
                <input
                  disabled={disable}
                  type="submit"
                  value={loading ? "Loading..." : "Sign In"}
                  className="btn bg-red-500 border-red-500 bg-opacity-70 text-white"
                ></input>
              </div>
              <p className="text-red-500 mx-auto">
                New here?{" "}
                <Link to="/register">
                  <span className="font-bold">Create a new account</span>
                </Link>
              </p>
              <div className="flex flex-col items-center gap-3 mx-auto">
                <p className="text-gray-700 font-semibold">Or sign in with</p>
                <div className="flex gap-6">
                  <div className="rounded-full p-2 border-2 border-red-500 hover:border-red-500 text-red-500 hover:text-gray-500 duration-200">
                    <FaFacebookF />
                  </div>
                  <div onClick={handleGoogleSignIn} className="rounded-full p-2 border-2 border-red-500 hover:border-red-500 text-red-500 hover:text-gray-500 duration-200">
                    <BsGoogle />
                  </div>
                  <div className="rounded-full p-2 border-2 border-red-500 hover:border-red-500 text-red-500 hover:text-gray-500 duration-200">
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

Login.propTypes = {};

export default Login;
