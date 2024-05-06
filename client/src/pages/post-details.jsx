import {React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/comment';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { URL, IF } from '../url';
import { UserContext } from '../context/UserContext';
import Loader from '../components/loader';

const PostDetails = () => {
  const PostID = useParams().id;

  const [post, setpost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setcomments] = useState([]);
  const [comment, setComment] = useState('');
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + PostID);
      setpost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + PostID, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = () => {
    if(window.confirm("Are you sure you want to delete post?"))
        handleDeletePost()
  }

  useEffect(() => {
    fetchPost();
  }, [PostID]);

  const fetchPostComments = async () => {
    setloader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + PostID);
      setcomments(res.data);
      setloader(false);
    } catch (err) {
      setloader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments()
  }, [PostID]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/comments/create", {
        comment: comment,
        author: user.username,
        postId: PostID,
        userId: user._id
      }, { withCredentials: true });
      // setComment('');
      // fetchPostComments(); // Update comments without reloading the page
      window.location.reload(true)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="bg-gray-50 min-h-screen">
  <Navbar />
  {loader ? (
    <div className='h-[80vh] flex justify-center items-center w-full'>
      <Loader />
    </div>
  ) : (
    <div className='px-8 md:px-32 lg:px-48 xl:px-64 mt-8'>
      <div className='bg-white border border-gray-200 p-4 shadow-lg rounded-md'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          {user?._id === post?.userId && (
            <div className='flex items-center space-x-4'>
              <p className='cursor-pointer text-blue-500 hover:text-blue-700' onClick={() => navigate("/edit/" + PostID)}>
                <BiEdit />
              </p>
              <p className='cursor-pointer text-red-500 hover:text-red-700' onClick={confirmDelete}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        <div>
          <img src={IF + post.photo} className='object-cover h-[45vh] mx-auto mt-4 shadow-md rounded' alt='' />
          <p className='text-justify mt-4 px-4 py-2 bg-gray-100 border border-gray-200 shadow-sm rounded-lg'>{post.desc}</p>
          <div className='flex justify-center items-center mt-8 space-x-2 font-semibold'>
            <p>Categories:</p>
            <div className='flex flex-wrap items-center gap-2'>
              {post.category?.map((c, i) => (
                <div key={i} className='bg-gray-200 rounded-full px-3 py-1 text-xs sm:text-sm md:text-base'>
                  {c}
                </div>
              ))}
            </div>
          </div>
          <h3 className='mt-12 mb-4 font-semibold text-center'>
            Comments:
          </h3>
          {comments?.map((c) => (
            <Comment key={c._id} c={c} post={post} />
          ))}
          <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-4 p-4 shadow rounded-md bg-white'>
            <input onChange={(e) => setComment(e.target.value)} type='text'
              placeholder='Write your comment'
              className='md:w-[80%] outline-none py-2 px-4' />
            <button onClick={postComment} className='bg-black hover:bg-blue-700 text-white font-semibold px-4 py-2 w-full md:w-auto'>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
  <Footer />
</div>

  );
};

export default PostDetails;
