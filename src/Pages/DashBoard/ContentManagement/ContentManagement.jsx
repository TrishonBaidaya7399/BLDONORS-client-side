import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUserInfo from "../../../Hooks/useUserInfo";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const userInfo = useUserInfo();

  useEffect(() => {
    // Fetch data from the JSON file (replace with your actual API endpoint)
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResult(filteredPosts);
    setShowAll(false);
  };

  const handleResetSearch = () => {
    setSearchText("");
    setSearchResult([]);
    setShowAll(false);
  };

  const displayPosts = searchText
    ? searchResult.slice(0, showAll ? searchResult.length : 6)
    : posts.slice(0, showAll ? posts.length : 6);

  // blog delete
  const handleDelete =(id)=>{
    console.log("Requested to delete: ", id);
    Swal.fire({
      title: "Are you sure?????",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blogs/${id}`).then((res) => {
          console.log("Deleted Count: ", res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This Blog has been deleted.",
              icon: "success",
            });
            const delayInSeconds = 2;
            setTimeout(() => {
              window.location.reload();
            }, delayInSeconds * 1000);
          }
        });
      }
    });
  }

  //set publish
  const handlePublish = async (id) => {
    const blogData = {
      status: "published",
    };
    console.log("Update requested: ", blogData);
    try {
      // request to update the donation request
      const result = await axiosSecure.patch(
        `/blogs/${id}`,
        blogData
      );

      console.log(result);

      if (result.data.modifiedCount > 0) {
           Swal.fire({
                title: "Published!",
                icon: "success",
                text: "Blog is successfully published!",
                confirmButtonText: "Ok!",
              });
              console.log(`Updating status of blog ${id}`);
              const delayInSeconds = 2;
            setTimeout(() => {
              window.location.reload();
            }, delayInSeconds * 1000);
      } 
        } catch (error) {
      console.error("Error confirming donation:", error);
      // Handle the error, for example, show an error message to the user
      Swal.fire({
        title: "Failed!",
        text: "Failed to publish",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  //set unpublish
  const handleUnPublish = async (id) => {
    const blogData = {
      status: "draft",
    };
    console.log("Update requested: ", blogData);
    try {
      // request to update the donation request
      const result = await axiosSecure.patch(
        `/blogs/${id}`,
        blogData
      );

      console.log(result);

      if (result.data.modifiedCount > 0) {
           Swal.fire({
                title: "Unpublished!",
                icon: "success",
                text: "Blog is successfully unpublished!",
                confirmButtonText: "Ok!",
              });
              console.log(`Updating status of blog ${id}`);
              const delayInSeconds = 2;
            setTimeout(() => {
              window.location.reload();
            }, delayInSeconds * 1000);
      } 
        } catch (error) {
      console.error("Error confirming unpublish:", error);
      // Handle the error, for example, show an error message to the user
      Swal.fire({
        title: "Failed!",
        text: "Failed to unpublish",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  console.log(displayPosts[0]?.photo);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Blogs
      </h1>
      <div className="mb-4 mx-auto w-[500px] flex items-center relative">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-3 rounded-l-md w-full border-2 border-red-500"
        />
        {searchText && (
          <button
            className="absolute right-0 btn text-red-500 bg-[transparent] hover:bg-[transparent] shadow-none border-none text-3xl"
            onClick={handleResetSearch}
          >
            x
          </button>
        )}
        <button
          className="absolute -right-20 btn bg-red-500 text-white px-4 border-2 text-xl h-[52px] border-red-500 rounded-none rounded-r-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex justify-end lg:mr-[200px]">
        <Link to="/dashboard/content-management/add-blog">
          <button className="border-2 border-red-500 py-1 px-2 rounded-lg text-red-500 font-bold">
            + Add Blog Post
          </button>
        </Link>
      </div>
      {
        displayPosts?.length>0
        ?
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-[200px]">
        {displayPosts.map((post) => (
          <div
            key={post.id}
            className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-x rounded-mdl shadow-xl p-4"
          >
            <div className="relative">
              <img src={post?.photo} className="rounded-md w-full" alt="Shoes" />
            
              {
                post?.status === "published"
                &&
                <div className="absolute rounded-lg w-fit bg-black drop-shadow-xl top-[10px] right-[10px] text-green-500 font-bold uppercase text-center flex justify-center items-center p-2 bg-opacity-70">
              <p className="text-sm">{post?.status}</p>
            </div>
              }
          
            </div>
            <div className="flex flex-col w-full mt-2">             
              <h2 className="card-title text-red-500">{post.title}</h2>
              <p className="pb-2 w-full text-gray-600 overflow-hidden max-h-[3em]" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="card-actions justify-start">
                <button className="text-red-500 font-semibold">
                  {`Read more->`}
                </button>
              </div>
              <div className="actions">
              {
                userInfo[0].role === "Admin" &&
              <div className="flex justify-between flex-row mt-4">
                <div className=" status-button">
                  {
                    post?.status === "draft"
                    ?
                    <button onClick={()=>handlePublish(post._id)} className="bg-green-500 py-1 px-3 text-white font-semibold rounded-lg">Publish</button>
                    :
                    <button onClick={()=>handleUnPublish(post._id)} className="bg-red-500 py-1 px-3 text-white font-semibold rounded-lg">Unpublish</button>
                  }
                </div>
                <div className="edit-button">
                <button onClick={()=>handleEdit(post._id)} className="bg-blue-500 py-1 px-3 text-white font-semibold rounded-lg">Edit</button>
                </div>
                <div className="delete-button">
                <button onClick={()=>handleDelete(post._id)} className="bg-red-500 py-1 px-3 text-white font-semibold rounded-lg">Delete</button>
                </div>
              </div>
              }
              </div>
            </div>
          </div>
        ))}
      </div>
      {(posts.length > 6 || searchResult.length > 6) && (
        <div className="text-center mt-6">
          <button
            className="btn bg-red-500 text-white px-4 py-2"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      )}
        </>
        :
        <div className="text-center">
          <h1 className="text-2xl text-red-500 font-bold">No Blog Posts Found</h1>
        </div>
      }
    </div>
  );
};

export default ContentManagement;
