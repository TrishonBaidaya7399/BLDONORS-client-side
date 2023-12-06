import { useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useUserInfo from "../../../../Hooks/useUserInfo";

// image hosting api
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const axiosPublic = useAxiosPublic();
  const userInfo = useUserInfo();
  console.log(userInfo[0].email);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Jodit React options
  const editorConfig = {
    height: "300px",
    tabIndex: 1,
  };

  const handleContentChange = (value) => {
    setValue("content", value);
  };

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      // Upload image
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      // Create user data
      const blogData = {
        title: data.title,
        content: data.content,
        photo: res.data.data.display_url,
        status: "draft",
      };
      console.log(blogData);
      // Post blog data
      const blogRes = await axiosPublic.post("/blogs", blogData);

      if (blogRes.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Blog Created!",
          text: "New Blog is posted successfully!",
          confirmButtonText: "Ok!",
        });

        // Reset form
        reset();
      }
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
      setErrorMessage("An error occurred while submitting data.");
      Swal.fire({
        icon: "error",
        title: "Blog Not Created!",
        text: { errorMessage },
        confirmButtonText: "Ok!",
      });
    } finally {
      // Set loading to false, whether success or failure
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-[3px] rounded-lg p-4 lg:p-12 mb-12 mx-4 lg:mx-[200px] border-red-500 bg-red-500 bg-opacity-20">
      <Helmet>
        <title>{`Bldonors | Add Blog`}</title>
      </Helmet>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold pb-2 border-b-[3px] border-red-500 px-4 w-fit">
          Add A New Blog
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:card-body">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Title
            </span>
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            name="title"
            className="border-2 border-red-500 input input-bordered"
            required
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Blog content
            </span>
          </label>
          <JoditEditor
            {...register("content", { required: true })}
            value={""} // Initial value, you can set it to an empty string or any default content
            config={editorConfig}
            onBlur={(value) => handleContentChange(value)}
          />
          {errors.content && (
            <span className="text-red-500">Content is required</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">
              Thumbnail Image
            </span>
          </label>
          <input
            {...register("image", { required: true })}
            required
            type="file"
            className="file-input w-full max-w-xs rounded-md bg-gray-100"
          />
        </div>
        <div className="form-control w-full mt-6">
          <input
            type="submit"
            value={loading ? "Loading..." : "Post"}
            className="btn bg-red-500 text-xl text-white"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
