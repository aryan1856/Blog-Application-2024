import React from 'react';
import { IF } from '../url';

const HomePost = ({ post }) => {
    return (
        <div className="bg-gray-100 border-gray-200 shadow md:h-auto h-auto flex flex-wrap justify-center" style={{ height: '450px' }}>
            <div className="overflow-hidden h-64 w-full md:w-3/4">
                <img className="object-cover w-full h-64 md:h-full transition duration-300 hover:scale-110" src={IF + post.photo} alt="" />
            </div>
    
            <div className="pl-3 py-2 w-full md:w-full mx-auto">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 text-center md:text-center">
                    {post.title}
                </h5>
    
                <p className="mt-2 font-normal text-gray-700 text-center md:text-center">
                    {post.desc?.slice(0, 75) || ''}...
                    <a href={`/posts/${post.id}`} className="text-blue-400 hover:text-red-500 cursor-pointer">Read More</a>
                </p>
    
                <div className="flex justify-between items-center pt-4 text-gray-400 text-xs md:flex-col md:items-start md:space-y-2">
                    <p className="text-blue-400">BY {post.username}</p>
                    <p>{new Date(post.updatedAt).toDateString()}</p>
                </div>
            </div>
        </div>
    );
}

export default HomePost;
