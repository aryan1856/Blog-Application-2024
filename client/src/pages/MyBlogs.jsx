import React from 'react'
import {Link,useLocation} from 'react-router-dom'
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { UserContext } from '../context/UserContext';
import { useContext,useEffect,useState } from 'react';
import axios from 'axios';
import {URL} from '../url'
import HomePosts from '../components/home-post'
import Loader from '../components/loader'





function MyBlogs() {
  const {search} = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const {user} = useContext(UserContext);

  const fetchPosts = async () => {
    if (!user?._id) {
      return; // Exit if no user ID is available
    }

    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?._id, search]); // Re-fetch posts when user ID or search changes

  return (
    <div>
      <Navbar />
      <div className='px-8 md:px-[200px] min-h-[80vh]'>
        {loader ? (
          <div className='h-[40vh] flex justify-center items-center'>
            <Loader />
          </div>
        ) : !noResults ? (
          <div className='flex flex-wrap justify-start items-stretch -mx-2'>
            {posts.map((post) => (
              <div key={post._id} className='px-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-5'>
                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                  <HomePosts post={post} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h3 className='text-center font-bold mt-16'>
            No posts available
          </h3>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default MyBlogs;
