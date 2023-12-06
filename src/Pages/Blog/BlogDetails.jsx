// import PropTypes from 'prop-types';

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const BlogDetails = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic()
    const [blog, setBlog]= useState({})
    console.log("Blog Id: ", id);
    useEffect(()=>{
        axiosPublic.get(`/blogs/${id}`)
        .then(res=>{
            setBlog(res.data)
        })
    },[axiosPublic, id])
    console.log("Blog Details: ", blog);
    return (
        <div className="overflow-x-hidden w-screen">
             <div className="mx-auto bg-[transparent] w-[95vw] lg:w-[70vw] drop-shadow-x rounded-lg shadow-xl p-4 border-[3px] border-red-500 my-12">
            <div className=" w-full mx-auto">
              <img
                src={blog[0]?.photo}
                className="rounded-md w-full mb-4"
                alt="Blog image"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="card-title text-2xl lg:text-4xl text-red-500 mt-2">{blog[0]?.title}</h2>
              <p className="pt-3 text-sm text-gray-800">
              {
              blog[0]?.status==="published"
              ?
              <span className="text-white bg-green-600 py-2 px-6 rounded-md font-bold mb-4">Published</span>
              :
              <span className="text-white bg-red-500 py-2 px-6 rounded-md mb-4 font-bold">Unpublished</span>
            }
              </p>
              <p className="pb-2 mt-4 text-gray-600" dangerouslySetInnerHTML={{ __html: blog[0]?.content }} />
            </div>
          </div>
        </div>
    );
};

BlogDetails.propTypes = {
    
};

export default BlogDetails;