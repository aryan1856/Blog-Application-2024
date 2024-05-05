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
      const res = await axios.get("/api/posts/" + PostID);
      setpost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete("/api/posts/" + PostID, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = () => {
    if(window.confirm("Are your sure you want t0 delete post?"))
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
    <div>
      <Navbar />
      {loader ? (
        <div className='h-[80vh] flex justify-center items-center w-full'>
          <Loader />
        </div>
      ) : (
        <div className='px-8 md:px-[200px] mt-8'>
          <div className='border p-3 shadow'>
            <div className='flex justify-between items-center'>
            <h1 className="text-3xl font-bold text-black md:text-3xl">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className='flex items-center justify-center space-x-2 '>
                  <p className='cursor-pointer ' onClick={() => navigate("/edit/" + PostID)}>
                    <BiEdit />
                  </p>
                  <p className='cursor-pointer ' onClick={confirmDelete}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
            <div className='w-[100%] flex flex-col'>
              <img src={IF + post.photo} className='object-cover h-[45vh] mx-auto mt-8' alt='' />
              <p className='text-justify mt-4 px-2 md:px-4 lg:px-8 w-full border p-3 shadow-sm'>{post.desc}</p>
              <div className='flex justify-center items-center mt-8 space-x-4 font-semibold'>
                <p>Categories: </p>
                <div className='flex justify-center items-center space-x-2'>
                  {post.category?.map((c, i) => (
                    <div key={i} className='bg-gray-300 rounded-xl px-3 py-1'>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-center items-center p-3 flex-col mt-4'></div>
              <h3 className='items-center mt-8 space-x-4 font-semibold'>
                Comments:
              </h3>
              {comments?.map((c) => (
                <Comment className='' key={c._id} c={c} post={post} />
              ))}
              <div className='border flex justify-center flex-col mt-4 md:flex-row'>
                <input onChange={(e) => setComment(e.target.value)} type='text'
                  placeholder='Write your comment'
                  className='md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0' />
                <button onClick={postComment} className='bg-black text-xm text-white font-semibold px-2 py-2 md:w-[50%] mt-4 md:mt-0'>
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
