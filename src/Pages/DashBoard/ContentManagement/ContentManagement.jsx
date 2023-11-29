import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUserInfo from "../../../Hooks/useUserInfo";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Pagination from "react-js-pagination";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'published', 'draft'
  const userInfo = useUserInfo();
  // pagination stats
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    // Fetch data from the JSON file (replace with your actual API endpoint)
    fetch("https://bldonors-server.vercel.app/blogs")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [activePage]);

  const handleSearch = () => {
    console.log("Search clicked! Searching for:", searchText);
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResult(filteredPosts);
    setShowAll(false);
  };

  // const handleResetSearch = () => {
  //   setSearchText("");
  //   setSearchResult([]);
  //   setShowAll(false);
  // };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return post.status === filterStatus;
    }
  });

  const displayPosts = searchText
    ? searchResult.slice(0, showAll ? searchResult.length : 6)
    : filteredPosts.slice(0, showAll ? filteredPosts.length : 6);

  // blog delete
  const handleDelete = (id) => {
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
  };

  //set publish
  const handlePublish = async (id) => {
    const blogData = {
      status: "published",
    };
    console.log("Update requested: ", blogData);
    try {
      // request to update the donation request
      const result = await axiosSecure.patch(`/blogs/${id}`, blogData);

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
      const result = await axiosSecure.patch(`/blogs/${id}`, blogData);

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

  const handleEdit = (id) => {
    console.log(`Requested to edit this id: ${id}`);
  };

  return (
    <div className="pb-12 mx-auto">
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Blogs
      </h1>

     <div className="flex flex-col md:flex-row justify-center items-center lg:mx-[200px]">
       {/* <---------------Material UI SearchBar-------------------> */}
       <Toolbar>
        <Search
          sx={{ border: "3px solid red", minWidth: "300px", color: "red" }}
        >
          <StyledInputBase
          sx={{width:"80%", color:"red"}}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon sx={{ color: "red" }} />
          </IconButton>
        </Search>
      </Toolbar>

      <div className="filter-buttons flex gap-4 mx-auto justify-center bg-red-500 w-fit px-8 py-2 rounded-lg h-12 w-[95vw] mx-6">
        <label htmlFor="statusFilter" className="text-white font-semibold">
          Filter by Status:
        </label>
        <select
          className="rounded-lg"
          id="statusFilter"
          onChange={handleFilterChange}
          value={filterStatus}
        >
          <option value="all"> All</option>
          <option value="published"> Published</option>
          <option value="draft"> Draft</option>
        </select>
      </div>
      <div className="flex justify-end mx-6">
        <Link to="/dashboard/content-management/add-blog">
          <button className="border-2 border-red-500 py-[10px] px-8 rounded-lg text-red-500 font-bold">
            + Add Blog Post
          </button>
        </Link>
      </div>
     </div>
      {displayPosts?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-[200px]">
            {displayPosts.slice(startIndex, endIndex).map((post) => (
              <div
                key={post.id}
                className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-x rounded-mdl shadow-xl p-4"
              >
                <div className="relative">
                  <img
                    src={post?.photo}
                    className="rounded-md w-full"
                    alt="Shoes"
                  />

                  {post?.status === "published" && (
                    <div className="absolute rounded-lg w-fit bg-black drop-shadow-xl top-[10px] right-[10px] text-green-500 font-bold uppercase text-center flex justify-center items-center p-2 bg-opacity-70">
                      <p className="text-sm">{post?.status}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full mt-2">
                  <h2 className="card-title text-red-500">{post.title}</h2>
                  <p
                    className="pb-2 w-full text-gray-600 overflow-hidden max-h-[3em]"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <div className="card-actions justify-start">
                    <button className="text-red-500 font-semibold">
                      {`Read more->`}
                    </button>
                  </div>
                  <div className="actions mt-4">
                    {userInfo[0].role === "Admin" ? (
                      <div className="flex justify-between flex-row mt-4">
                        <div className=" status-button">
                          {post?.status === "draft" ? (
                            <button
                              onClick={() => handlePublish(post._id)}
                              className="bg-green-500 py-1 px-3 text-white font-semibold rounded-lg"
                            >
                              Publish
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnPublish(post._id)}
                              className="bg-red-500 py-1 px-3 text-white font-semibold rounded-lg"
                            >
                              Unpublish
                            </button>
                          )}
                        </div>
                        <div className="edit-button">
                          <button
                            onClick={() => handleEdit(post._id)}
                            className="bg-blue-500 py-1 px-3 text-white font-semibold rounded-lg"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="delete-button">
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="bg-red-500 py-1 px-3 text-white font-semibold rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      userInfo[0].role !== "Donor" && (
                        <div className="edit-button">
                          <button
                            onClick={() => handleEdit(post._id)}
                            className="bg-blue-500 py-1 px-3 text-white font-semibold rounded-lg"
                          >
                            Edit
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl text-red-500 font-bold">
            No Blog Posts Found
          </h1>
        </div>
      )}
      {/* Pagination */}
      <div className="pagination-container mx-auto w-fit mt-6 font-bold text-xl">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={displayPosts.length}
          pageRangeDisplayed={6}
          onChange={(pageNumber) => setActivePage(pageNumber)}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
};

export default ContentManagement;
