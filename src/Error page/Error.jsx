import img from "../images/others/404.gif";
import Navbar from "../Components/Shared/Navbar/Navbar";
import { useRouteError } from "react-router-dom";
import Footer from "../Components/Shared/Footer/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  // Log the error to the console
  console.error(error);

  return (
    <div id="error-page">
      <Navbar />
      <div>
        <img className="w-full h-[90vh]" src={img} alt="404 Not Found" />
      </div>
      <Footer/>
    </div>
  );
};

export default ErrorPage;
