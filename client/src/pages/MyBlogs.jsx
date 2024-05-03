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

  const {search} = useLocation()
  const [posts,setposts] = useState([])
  const [noResults,setNoResults] = useState(false)
  const [loader,setloader] = useState(false);
  const {user} = useContext(UserContext)



  const fetchposts = async()=>{
    setloader(true)
    try{
       const res = await axios.get(URL + "/api/posts/user/" + user._id)
       setposts(res.data)
       if(res.data.length === 0){
        setNoResults(true)
       }
       else{
        setNoResults(false)
       }
       setloader(false)



    }
    catch(err){
      console.log(err)

      setloader(true)
    }
  }

 useEffect(()=>{
  fetchposts();

 },[search])


  return (
    <div>
      <Navbar/>
      <div className='px-8 md:px-[200px] min=h-[80vh] '>
     {loader?
     <div className='h-[40vh] flex justify-center items-center'>
      <Loader/>
     </div> : !noResults ? 
     posts.map((post)=>(
      <div className='w-[40vh] mt-5'>
        <Link to={user?'/posts/post/${post._id}': "/login"}>
         <HomePosts key={post._id} post={post}></HomePosts>
        </Link>
      </div>
     )):
     <h3 className='text-center font-bold mt-16 '> 
    No posts available
     </h3>
     
     
    }
      </div>
      <Footer/>
    </div>
  )
}

export default MyBlogs;