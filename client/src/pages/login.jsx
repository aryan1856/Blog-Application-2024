import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import { UserContext } from '../context/UserContext'

const Login = () => {

 

    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [error,seterror] = useState(false)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

  
    const handleLogin = async() => {
      try{
        const res = await fetch("/api/auth/login",{
         method: 'POST',
         headers:{
          'Content-Type':'application/json',
         },
         credentials:'include',
         body:JSON.stringify({email:email,password:password})
        })

        if(res.ok){
          const data= await res.json();
          const cookies = res.headers.get('Set-Cookie');
          console.warn('Data',data)
          console.warn('Cookies',cookies)

          setUser(data)
        }
        else {
          console.error('Request failed with status ',res.status);

        }
  
        navigate("/")

      }
      catch(err){
      seterror(true)
      console.log(err)
      }
    }

  return (
    <div>
     <div className='flex items-center justify-between px-6 md:px-[200px] py-4 bg-blue-900'>
        <h1 className='text-lg md:text-xl font-extrabold text-white'>
          <Link to="/">LifeLens Blog</Link>
        </h1>
        <h3 className='text-white'>
          <Link to="/register">Register</Link>
        </h3>
      </div>
     <div className='w-full flex justify-center items-center h-[80vh] bg-gray-100'>
     <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] p-6 md:p-12 bg-white rounded-lg shadow-md h-[50vh] md:h-[55vh]'>
 
      <h1 className='text-xl font-bold text-center'> 
        Login to Your Account
      </h1>
         
      <input onChange={(e) => setemail(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded outline-none' type='email' placeholder='Enter Email'>
      </input>
      <input onChange={(e) => setpassword(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded outline-none' type='password' placeholder='Enter Password'>
      </input>

      <button onClick={handleLogin} className='w-full py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'>
        Login
      </button>

      {error && <h3 className='text-red-500 text-sm text-center'>Something went wrong</h3>}

      <div className='flex justify-center items-center space-x-3'>
        <p>New Here?</p>
        <p className='text-blue-500 hover:text-red-500'>
          <Link to='/register'>
             Register</Link>
        </p>
      </div>
    </div>
</div>

     <Footer/>

     
    </div>
  )
}

export default Login;