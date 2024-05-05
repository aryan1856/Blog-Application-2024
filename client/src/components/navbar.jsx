import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { UserContext } from '../context/UserContext';
import Menu from './menu';

function Navbar() {
    const [category, setCategory] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext) || {};

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const toggleSearch = () => {
        setIsSearchVisible(prev => !prev);
    };

    const handleSearch = () => {
        if (!category.trim()) {
            alert("Please enter a valid category.");
            return;
        }
        navigate(`/posts/category/${category.trim()}`);
        setCategory("");
        setIsSearchVisible(false); // Optionally hide search after use
    };

    return (
        <div className="bg-blue-900 text-white relative">
            <div className='flex items-center justify-between px-4 py-3'>
                <Link to="/" className='text-lg font-bold whitespace-nowrap'>
                    LifeLens Blog
                </Link>
                {/* Search icon only for mobile */}
                <div className='md:hidden p-2 cursor-pointer' onClick={toggleSearch}>
                    <FaSearch className="text-xl" />
                </div>
                {/* Conditional rendering for search box: hidden on mobile initially, always visible on desktop */}
                <div className={`absolute md:relative top-full md:top-auto right-0 mt-1 md:mt-0 z-50 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none rounded-lg md:rounded-none p-4 md:p-0 ${
                    isSearchVisible ? 'block' : 'hidden' } md:block`}>
                    <div className='flex items-center'>
                        <input
                            className='flex-grow h-10 w-48 border border-blue-500 rounded-full px-4 text-black placeholder-gray-500'
                            placeholder='Search by Category'
                            type='text'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button
                            className='ml-2 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-blue-600 transition duration-300'
                            onClick={handleSearch}
                            aria-label="Search"
                        >
                            <BsSearch className='w-5 h-5' />
                        </button>
                    </div>
                </div>
                <div className='hidden md:flex space-x-4 items-center'>
                    {user ? (
                        <>
                            <Link to='/write' className='py-2 px-4 rounded bg-blue-700 hover:bg-blue-800 transition duration-300'>Write</Link>
                            <div onClick={toggleMenu} className='cursor-pointer'>
                                <FaBars className='w-6 h-6'/>
                                {isMenuOpen && <Menu />}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='py-2 px-4 rounded bg-blue-700 hover:bg-blue-800 transition duration-300'>Login</Link>
                            <Link to='/register' className='py-2 px-4 rounded bg-blue-700 hover:bg-blue-800 transition duration-300'>Register</Link>
                        </>
                    )}
                </div>
                <div className='md:hidden' onClick={toggleMenu}>
                    <FaBars className='w-6 h-6'/>
                </div>
            </div>
            {isMenuOpen && <Menu />}
        </div>
    );
}

export default Navbar;
