import React from 'react'
import {IF} from '../url'

function HomePost ({post}){
    return(
        <div>
         <div className=' h-[45vh] flex flex-wrap bg-white border-gray-200 shadow'>
                 <div className='overflow-hidden h-[40vh]'>
                  <img className='object-fit w-96 hover:scale-150' src={IF + post.photo} alt=''/>
                    <div className='pl-3 '>
                       <h5 className='text-xl font-bold tracking-tight text-gray-900'>
                        {post.title}
                       </h5>
                       <div className='mb-3 text-xs font-semibold text-gray-500 items-center justify-center flex'>
                      <p className='text-blue-400'> BY {post.username}</p>
                       <div className='mt-2 font-normal text-gray-700'>
                         <p>{post.desc.slice(0,75) + "...Read More"}</p>
                       </div>
                       <div className=' flex flex-wrap pt-4 text-gray-400 text-xs'>
                        <p>{new Date(post.updatedAt).toString().slice(3,15)}</p>

                       </div>
                       </div>
                     </div>               
                 </div>
         </div>
        </div>
    )
}

export default HomePost