import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from 'axios';
import { URL } from '../url';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
const [email, setEmail] = useState(user?.email || "");

  const [newPassword, setNewPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if user is undefined
    } else if (user._id) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`${URL}/api/users/${user._id}`);
          setUsername(res.data.username);
          setEmail(res.data.email);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch data");
        }
      };
      fetchProfile();
    }
  }, [user, navigate]);
  

  const handleUserUpdate = async () => {
    if(!window.confirm("Confirm updates!"))
        return;
    setLoading(true);
    const updateData = {
      username,
      email
    };
  
    // Only include the password in the update if a new password has been provided
    if (newPassword) {
      updateData.password = newPassword;
    }
  
    try {
      const res = await axios.put(`${URL}/api/users/${user._id}`, updateData, {
        withCredentials: true
      });
      console.log(res.data);
      setUser({ ...user, ...updateData }); // Update the user context if needed
      setUpdated(true);
      setEditMode(false);
      setNewPassword("");

    } catch (err) {
      console.error(err);
      setError("Update failed");
      setUpdated(false);
    } finally {
      setLoading(false);
    }
  };
  

  const handleUserDelete = async () => {
    if(!window.confirm("Are you sure to delete account?"))
        return;
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setError('');
    setUpdated(false);
    // Reset fields to original values if needed
    setUsername(user.username);
    setEmail(user.email);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-profile-bg bg-cover bg-center sm:bg-left md:bg-right lg:bg-top min-h-screen">
      <div className='border p-3 text-center align-middle flex flex-col items-center justify-center w-full mx-auto shadow-2xl h-auto md:max-w-2xl md:h-screen lg:mx-32'>
        <div className='w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-3xl text-white font-bold'>
          {username && username.match(/\b\w/g).reduce((acc, letter) => acc + letter.toUpperCase(), '')}
        </div>
        <div className='flex flex-col space-y-4 justify-center w-full px-4'>
          <h1 className='text-xl font-bold mb-4 mt-4'>{username || "Profile"}</h1>
          {editMode ? (
            <>
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='outline-none flex w-full py-2 text-gray-500' />
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none flex w-full py-2 text-gray-500' />
              <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='outline-none flex w-full py-2 text-gray-500' placeholder='New password' />
            </>
          ) : (
            <>
              <p>{username}</p>
              <p>{email}</p>
            </>
          )}
          <div className='flex items-center justify-center space-x-6 mt-8'>
            {editMode ? (
              <>
                <button disabled={loading} className='text-white font-semibold bg-black px-4 py-2 hover:bg-gray-400 min-w-[120px] rounded-lg' onClick={handleUserUpdate}>Save Changes</button>
                <button className='text-white font-semibold bg-red-500 px-4 py-2 hover:bg-red-700 min-w-[120px] rounded-lg' onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button className='text-white font-semibold bg-black px-4 py-2 hover:bg-gray-400 min-w-[120px] rounded-lg' onClick={() => setEditMode(true)}>Edit Profile</button>
                <button className='text-white font-semibold bg-red-500 px-4 py-2 hover:bg-red-700 min-w-[120px] rounded-lg' onClick={handleUserDelete}>Delete</button>
              </>
            )}
          </div>
          {updated && <h3 className='text-green-500 text-sm text-center mt-4'>User data updated successfully</h3>}
          {error && <h3 className='text-red-500 text-sm text-center mt-4'>{error}</h3>}
        </div>
        
      </div>
        </div>
      <Footer />
    </div>
  );
}

export default Profile;