import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file (replace with your actual API endpoint)
    fetch('https://bldonors-server.vercel.app/donationRequest')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) => {
      const isEmailMatch = post.donorEmail.toLowerCase().includes(searchText.toLowerCase());  
      return isEmailMatch;
    });
  
    setSearchResult(filteredPosts);
    setShowAll(false);
  };


  const displayPosts = searchText
    ? searchResult.slice(0, showAll ? searchResult.length : 6)
    : posts.slice(0, showAll ? posts.length : 6);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Donation Requests
      </h1>
      <div className="mb-4 mx-auto w-[500px] flex items-center space-x-4 relative">
        <input
          type="text"
          placeholder="Search by donor email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-3 rounded-l-md w-full border-2 border-red-500"
        />
        <button
          className="absolute -right-20 btn bg-red-500 text-white px-4 border-2 text-xl h-[52px] border-red-500 rounded-none rounded-r-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-[200px]">
        {displayPosts.map((post) => (
          <div key={post.id} className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-x rounded-mdl bg-red-500 bg-opacity-20 shadow-xl p-4">
            <div className="flex flex-col w-full">
              <p className="pt-3 w-full text-sm text-gray-800">
                <span className="text-gray-500 font-bold"><span className='text-md font-bold text-gray-600'>Status: </span>{post.status}</span>
              </p>
              <h2 className="card-title text-red-500 mt-2"><span className='text-md font-bold text-gray-600'>Recipient: </span>{post.recipientName}</h2>
              <p className="pb-2 w-full text-gray-600 overflow-hidden max-h-[3em]"><span className='text-md font-bold text-gray-600'>Hospital: </span>{post.hospitalName}</p>
              <p className="pb-2 w-full text-gray-600 overflow-hidden max-h-[3em]"><span className='text-md font-bold text-gray-600'>Date: </span>{post.date} - at - {post.time}</p>
              <p className="pb-2 w-full text-gray-600 overflow-hidden max-h-[3em]"><span className='text-md font-bold text-gray-600'>Blood Group: </span><span className='text-red-500 text-xl font-bold'>{post.bloodGroup}</span></p>
              <div className="card-actions justify-start">
                <Link to={`http://localhost:5173/bloodDonationDetails/${post._id}`}>
                <button className="text-red-500 mt-2">{`Read more->`}</button>
                </Link>
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
            {showAll ? 'See less' : 'See more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
