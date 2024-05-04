import React from 'react'
import {IF} from '../url'

const HomePost = ({post}) => {
    return(
      <div>
      <div className='h-[50vh] flex flex-wrap bg-gray-100 border-gray-200 shadow'>
        <div className='overflow-hidden h-[40vh]'>
          <img className='object-cover w-full hover:scale-150 transition duration-300' src={IF + post.photo} alt=''/>
        </div>
    
        <div className='pl-3 py-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900'>
            {post.title}
          </h5>
    
          <p className='mt-2 font-normal text-gray-700'>
            {post.desc.slice(0, 75)}
            <span className='text-blue-400 hover:text-red-500 cursor-pointer'>...Read More</span>
          </p>
    
          <div className='flex justify-between items-center pt-4 text-gray-400 text-xs'>
            <p className='text-blue-400'>BY {post.username}</p>
            <p>{new Date(post.updatedAt).toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
    
    )
}

export default HomePost