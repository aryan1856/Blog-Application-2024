import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState("blog");
    const [customCat, setCustomCat] = useState("");  // State for custom category input
    const [cats, setCats] = useState([cat]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteCategory = (i) => {
      let updatedCats = [...cats];
      updatedCats.splice(i, 1); // Fixed to correctly remove item at index i
      setCats(updatedCats);
    };

    const addCategory = () => {
      if (cat && !cats.includes(cat)) {
        setCats(cats => [...cats, cat]);
        setCat("");
      }
    };
  
    const addCustomCategory = () => {
        if (customCat && !cats.includes(customCat)) {
            setCats(cats => [...cats, customCat]);
            setCustomCat("");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            category: cats
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;
            try {
                await axios.post("/api/upload", data);
            } catch (err) {
                console.error(err);
            }
        }

        try {
            const res = await axios.post("/api/posts/create", post, { withCredentials: true });
            navigate("/posts/post/" + res.data._id);
        } catch (err) {
            console.error(err);
        }
    };

    const ProtectedRoute = ({children}) =>{
        const {isLoggedIn} = UserContext();
        if(!isLoggedIn)
            return navigate("/login");
        return children;
    }

    return (
        <div>
            <Navbar />
            <div className='flex justify-center mt-10'>
                <div className='border shadow-xl w-full max-w-4xl mx-4'>
                    <h1 className='text-center font-bold text-2xl mb-4'>Create a Post</h1>
                    <form onSubmit={handleCreate} className='p-4 space-y-4'>
                        <input className='w-full p-2 border rounded hover:border-gray-500' type="text" placeholder='Enter post title' value={title} onChange={e => setTitle(e.target.value)} required />
                        <input className='w-full p-2 border rounded hover:border-gray-500' type="file" onChange={e => setFile(e.target.files[0])} />
                        <div>
                            <select className='p-2 border rounded w-full hover:bg-gray-100' value={cat} onChange={(e) => setCat(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Artificial Intelligence">Artificial Intelligence</option>
                                <option value="Big Data">Big Data</option>
                                <option value="Blockchain">Blockchain</option>
                                <option value="Business Management">Business Management</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                                <option value="Database">Database</option>
                                <option value="Cyber Security">Cyber Security</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Operating System">Operating System</option>
                                <option value="Enterprise">Enterprise</option>
                            </select>
                            <button type="button" className='mt-2 bg-black text-white p-2 w-full hover:bg-gray-800' onClick={addCategory}>Add Selected Category</button>
                        </div>
                        <div className='flex gap-2'>
                            <input className='flex-grow p-2 border rounded hover:bg-gray-100' type="text" placeholder='Or enter a new category' value={customCat} onChange={e => setCustomCat(e.target.value)} />
                            <button type="button" className='bg-black text-white px-4 py-2 hover:bg-gray-800' onClick={addCustomCategory}>Add Custom</button>
                        </div>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {cats.map((c, i) => (
                                <div key={i} className='flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <ImCross onClick={() => deleteCategory(i)} className='cursor-pointer hover:text-red-500' />
                                </div>
                            ))}
                        </div>
                        <textarea className='w-full p-2 border rounded hover:border-gray-500' rows="5" placeholder='Enter post description' value={desc} onChange={e => setDesc(e.target.value)} required />
                        <button type="submit" className='bg-black text-white p-2 w-full hover:bg-gray-800'>Create Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreatePost;
