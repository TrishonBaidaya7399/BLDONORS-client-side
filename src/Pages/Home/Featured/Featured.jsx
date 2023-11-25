// import PropTypes from 'prop-types';


const Featured = () => {
  return (
    <div className="px-auto bg-gray-200 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-[100px]">
        <div className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-x rounded-mdl shadow-xl p-4" data-aos="fade-up-left">
          <img
            src="https://i.ibb.co/711xvJB/card1.jpg"
            className="rounded-md w-full"
            alt="Shoes"
          />

          <div className="flex flex-col w-full">
            <h2 className="card-title pt-3 text-red-500">Become a donor</h2>
            <p className="pb-2 w-full text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
              aut.
            </p>
            <div className="card-actions justify-start">
              <button className="btn bg-black bg-opacity-20 text-red-500 border-2 border-red-500">{`Read more->`}</button>
            </div>
          </div>
        </div>
        <div className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-xl rounded-md shadow-xl p-4" data-aos="fade-up-left">
          <img
            src="https://i.ibb.co/0rnWhDb/card2.jpg"
            className="rounded-md w-full"
            alt="Shoes"
          />

          <div className="flex flex-col w-full">
            <h2 className="card-title pt-3 text-red-500">Why give blood?</h2>
            <p className="pb-2 w-full text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, quae!
            </p>
            <div className="card-actions justify-start">
              <button className="btn bg-black bg-opacity-20 text-red-500 border-2 border-red-500">{`Read more->`}</button>
            </div>
          </div>
        </div>
        <div className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-xl rounded-md shadow-xl p-4" data-aos="fade-up-left">
          <img
            src="https://i.ibb.co/yXGMQM3/card3.jpg"
            className="rounded-md w-full"
            alt="Shoes"
          />

          <div className="flex flex-col w-full">
            <h2 className="card-title pt-3 text-red-500">
              How donation helps?
            </h2>
            <p className="pb-2 w-full text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, quae!
            </p>
            <div className="card-actions justify-start">
              <button className="btn bg-black bg-opacity-20 text-red-500 border-2 border-red-500">{`Read more->`}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero pt-[100px] lg:px-[200px] ">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img
            src="https://i.ibb.co/1KhqCyM/Blood-types.jpg"
            className="rounded-lg shadow-2xl w-[400px]"
          />
          <div className="">
            <h1 className="text-3xl font-bold border-b-2 border-red-500">Who Are Blood Donors Group</h1>
            <p className="py-4">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. 
            </p>
            <ul className="pb-4">
                <li className="">{`->Hight quality assessment, diagnosis and treatment`}</li>
                <li className="">{`->The extra care of multi-disciplinary team`}</li>
                <li className="">{`->Increasing communication with our team`}</li>
            </ul>
            <button className="btn bg-black bg-opacity-20 text-red-500 border-2 border-red-500">{`Read more`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Featured.propTypes = {};

export default Featured;
