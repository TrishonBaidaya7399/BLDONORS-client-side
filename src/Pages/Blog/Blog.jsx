import { useState, useEffect } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file (replace with your actual API endpoint)
    fetch('https://bldonors-server.vercel.app/blogs')
      .then((response) => response.json())
      .then((data) => {
        const publishedPosts = data.filter((post) => post.status === 'published')      
        setPosts(publishedPosts)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResult(filteredPosts);
    setShowAll(false);
  };

  const handleResetSearch = () => {
    setSearchText('');
    setSearchResult([]);
    setShowAll(false);
  };

  const displayPosts = searchText
    ? searchResult.slice(0, showAll ? searchResult.length : 6)
    : posts.slice(0, showAll ? posts.length : 6);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Blogs
      </h1>
      <div className="mb-4 mx-auto w-[250px] lg:w-[500px] flex items-center relative">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className=" p-3 rounded-l-md w-full -ml-12 border-2 border-red-500"
        />
         {searchText && (
          <button
            className="absolute right-0 btn text-gray-400 bg-[transparent] hover: bg-[transparent] shadow-none border-none text-3xl pr-8"
            onClick={handleResetSearch}
          >
            x
          </button>
        )}
       
        <button
          className="absolute -right-10 lg:-right-30 btn bg-red-500 text-white px-4 border-2 text-xl h-[52px] border-red-500 rounded-none rounded-r-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-[200px]">
        {displayPosts.map((post) => (
          <div key={post.id} className="mx-auto card w-[250px] bg-[transparent] w-full drop-shadow-x rounded-mdl shadow-xl p-4">
            <div className="relative">
              <img
                src={post?.photo}
                className="rounded-md w-full"
                alt="Shoes"
              />
            </div>

            <div className="flex flex-col w-full">
              <p className="pt-3 w-full text-sm text-gray-800">
                <span className="text-gray-500 font-bold">{post.status}</span>
              </p>
              <h2 className="card-title text-red-500 mt-2">{post.title}</h2>
              <p className="pb-2 w-full text-gray-600 overflow-hidden max-h-[3em]" dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="card-actions justify-start">
                <button className="text-red-500 mt-2">{`Read more->`}</button>
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

export default Blog;
