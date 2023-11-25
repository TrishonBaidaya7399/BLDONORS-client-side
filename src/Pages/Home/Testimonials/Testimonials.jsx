import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
// import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Testimonials = () => {
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    // speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  useEffect(()=>{
      setLoading(false);
  },[])

  return (
    <div className="px-[20px] md:px-[50px] lg:px-[200px] py-12">
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        What Our Donor Says
      </h1>
      <div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Slider className="my-12 " {...settings}>
            <div>
              <div className="z-10 card border-2 border-orange-600 rounded-lg p-12 space-y-4 mx-7">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="rounded-full w-[80px] h-[80px] border-2 border-red-500 p-1"
                      src="https://i.ibb.co/r38S2t7/photo-1535713875002-d1d0cf377fde-q-80-w-1000-auto-format-fit-crop-ixlib-rb-4-0.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="text-[25px] text-red-500 font-bold">
                        Trishon Baidaya
                      </h1>
                      <h1 className="text-xl font-bold text-gray-400">
                        Social Media Influencer
                      </h1>
                    </div>
                  </div>
                  
                </div>
                <div className="text-md text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    repellendus veritatis laboriosam nisi cumque eos, suscipit
                    ex delectus harum! Illo!
                  </p>
                </div>
                <div className="flex opacity-90">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className="text-[30px] text-red-500"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="z-10 card border-2 border-orange-600 rounded-lg p-12 space-y-4 mx-7">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="rounded-full w-[80px] h-[80px] border-2 border-red-500 p-1"
                      src="https://i.ibb.co/r38S2t7/photo-1535713875002-d1d0cf377fde-q-80-w-1000-auto-format-fit-crop-ixlib-rb-4-0.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="text-[25px] text-red-500 font-bold">
                        Trishon Baidaya
                      </h1>
                      <h1 className="text-xl font-bold text-gray-400">
                        Social Media Influencer
                      </h1>
                    </div>
                  </div>
                  
                </div>
                <div className="text-md text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    repellendus veritatis laboriosam nisi cumque eos, suscipit
                    ex delectus harum! Illo!
                  </p>
                </div>
                <div className="flex opacity-90">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className="text-[30px] text-red-500"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="z-10 card border-2 border-orange-600 rounded-lg p-12 space-y-4 mx-7">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="rounded-full w-[80px] h-[80px] border-2 border-red-500 p-1"
                      src="https://i.ibb.co/r38S2t7/photo-1535713875002-d1d0cf377fde-q-80-w-1000-auto-format-fit-crop-ixlib-rb-4-0.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="text-[25px] text-red-500 font-bold">
                        Trishon Baidaya
                      </h1>
                      <h1 className="text-xl font-bold text-gray-400">
                        Social Media Influencer
                      </h1>
                    </div>
                  </div>
                  
                </div>
                <div className="text-md text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    repellendus veritatis laboriosam nisi cumque eos, suscipit
                    ex delectus harum! Illo!
                  </p>
                </div>
                <div className="flex opacity-90">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className="text-[30px] text-red-500"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="z-10 card border-2 border-orange-600 rounded-lg p-12 space-y-4 mx-7">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="rounded-full w-[80px] h-[80px] border-2 border-red-500 p-1"
                      src="https://i.ibb.co/r38S2t7/photo-1535713875002-d1d0cf377fde-q-80-w-1000-auto-format-fit-crop-ixlib-rb-4-0.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="text-[25px] text-red-500 font-bold">
                        Trishon Baidaya
                      </h1>
                      <h1 className="text-xl font-bold text-gray-400">
                        Social Media Influencer
                      </h1>
                    </div>
                  </div>
                  
                </div>
                <div className="text-md text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    repellendus veritatis laboriosam nisi cumque eos, suscipit
                    ex delectus harum! Illo!
                  </p>
                </div>
                <div className="flex opacity-90">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className="text-[30px] text-red-500"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="z-10 card border-2 border-orange-600 rounded-lg p-12 space-y-4 mx-7">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      className="rounded-full w-[80px] h-[80px] border-2 border-red-500 p-1"
                      src="https://i.ibb.co/r38S2t7/photo-1535713875002-d1d0cf377fde-q-80-w-1000-auto-format-fit-crop-ixlib-rb-4-0.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="text-[25px] text-red-500 font-bold">
                        Trishon Baidaya
                      </h1>
                      <h1 className="text-xl font-bold text-gray-400">
                        Social Media Influencer
                      </h1>
                    </div>
                  </div>
                  
                </div>
                <div className="text-md text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    repellendus veritatis laboriosam nisi cumque eos, suscipit
                    ex delectus harum! Illo!
                  </p>
                </div>
                <div className="flex opacity-90">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className="text-[30px] text-red-500"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
