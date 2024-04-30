import React from 'react'
import Footer from '../components/footer';
import {ImCross} from 'react-icons/im'
import { useState,useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';



function CreatePost() {
const [title,setTitle] = useState("")
const [desc,setdesc] = useState("")
const [file,setFile] = useState(null)
const [cat,setCat] = useState("a")
const [cats,setCats] = useState([])
const {user} = useContext(UserContext)
const navigate = useNavigate()
const addCategory= () => {
  let updatedcats = [... cats]
  updatedcats.push(cat)
  setCat("")
  setCats(updatedcats)
}

const deleteCategory = (i) =>{
  let updatedcats = [...cats]
  updatedcats.splice(i)
  setCats(updatedcats)
}

const handleCreate = async (e) => {
  e.preventDefault()
  const post = {
    title, desc,
    username: user.username,
    userId : user.userId,
    categories: cats
  }


if(file){
  const data = new FormData()
  const filename = Date.now()+file.name
  data.append("img",filename)
  data.append("file",file)
  post.photo = filename
try{
  const imgUpload = await axios.post("/api/upload",data)

}
catch(err){
  console.log(err)

}





}

try{
  const res = await axios.post("/api/posts/post/create", post,{withCredentials: true})
  navigate("/posts/post/" + res.data.Post._id)
}
catch(err){
  console.log(err)
}
}


  return (
    <div>
   <Navbar/>
   <div className='flex justify-center'>
        <div className='px-6 m-4 border flex flex-col w-[70%] shadow-xl md:px-[200px] mt-8'>
        
        <h1 className=' font-bold md:text-2xl text-2xl mt-3 flex justify-center'>
          Create a pos t
        </h1>

        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Enter post title' className='px-3 py-2 outline-none '>
           
          </input>
         <input onChange={(e)=> setFile(e.target.files[0])} type='file' className='px-4'>
         
         </input>

         <div className='flex flex-col'>
         <div className='flex items-center space-x-4 md:space-x-8'>
         <select name='' id="" value={cat} onChange={(e)=> setCat(e.target.value)}>
          <option value="Big Data ">Big Data</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Block Chain">Block Chain</option>
          <option value="Bussiness Management">Bussiness Management</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Database">Database</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="DevOps">DevOps</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Operating System">Operating System</option>
          <option value="EnterPrise">EnterPrise</option>
         </select>
         <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>
               ADD
         </div>

         </div>
             <div className='flex px-4 mt-3'>
              {
               cats?.map((c,i) => (
                <div key={i} className='flex justify-center items-center space-x-2 mt-4 bg-gray-200 px-2 py-1 rounded-md'>
                 <p>{c}</p>
                 <p onClick={()=> deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                </div>
               ))
              }
             </div>

            <textarea onChange={(e)=> setdesc(e.target.value)} rows={9} cols={30} className='px-4 py-2 outline-none font-semibold ' placeholder='Enter post description'>

            </textarea>
            <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>
                     Create blog
            </button>

         </div>
        </form>
        </div>
   </div>
  <Footer/>
    </div>
  )
}

export default CreatePost;