import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import axios from 'axios'
import {Link,useNavigation} from "react-router-dom"
function Menu(){
const {user} = useContext(UserContext)
const {setUser} = useContext(UserContext)
const navigate = useNavigation()
const handleLogout = async () => {
    try{
  const res = await axios.get("/api/auth/logout",{withCredentials:true})
  setUser(null)
  navigate("/login")
    }
    catch(err){
       console.log(err)
    }
}
return (
    <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4 '>
     {
        !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer '>
            <Link to='/login'>Login</Link>

        </h3>
     }

   {
        !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer '>
            <Link to='/register'>Register</Link>

        </h3>
     }

{
        user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer '>
            <Link to={'/profile/'}>Profile</Link>

        </h3>
     }


{
        user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer '>
            <Link to={'/write/' + user._id}>Write</Link>

        </h3>
     }

{
        user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer '>
            <Link to={'/myblogs/' + user._id}>My Blogs</Link>

        </h3>
     }

{
        user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer ' onClick={hand}>
            Logout 

        </h3>
     }

    </div>
)
}