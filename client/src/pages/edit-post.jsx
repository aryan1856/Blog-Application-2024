import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState("");
    const [customCat, setCustomCat] = useState("");
    const [cats, setCats] = useState([]);
    const [PostData, setPostData] = useState(null);

    const fetchPost = async () => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            setPostData(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setCats(res.data.category);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            category: cats,
            photo: PostData?.photo  // Use existing photo if no new file is uploaded
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);  // Ensuring the name field is set in your formData
            data.append("file", file);
            post.photo = filename;  // Update to new photo filename if file is uploaded
            try {
                await axios.post("/api/upload", data);
            } catch (err) {
                console.error(err);
            }
        }

        try {
            await axios.put(`/api/posts/${id}`, post, { withCredentials: true });
            navigate(`/posts/post/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    const confirmUpdate = (e) => {
        e.preventDefault(); // Prevent form submission to wait for confirmation
        if (window.confirm("Are you sure you want to update this post?")) {
            handleUpdate(e);
        }
    };

    const confirmCancel = () => {
        if (window.confirm("Are you sure you want to cancel?")) {
            handleCancel();
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const addCategory = () => {
        if (cat && !cats.includes(cat)) {
            setCats([...cats, cat]);
            setCat("");
        }
    };

    const addCustomCategory = () => {
        if (customCat && !cats.includes(customCat)) {
            setCats([...cats, customCat]);
            setCustomCat("");
        }
    };

    const deleteCategory = (i) => {
        const updatedCats = [...cats];
        updatedCats.splice(i, 1);
        setCats(updatedCats);
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center mt-10'>
                <div className='border shadow-xl w-full max-w-4xl mx-4'>
                    <h1 className='text-center font-bold text-2xl mb-4'>Update Your Post</h1>
                    <form onSubmit={confirmUpdate} className='p-4 space-y-4'>
                        <input className='w-full p-2 border rounded' type="text" placeholder='Enter post title' value={title} onChange={e => setTitle(e.target.value)} required />
                        <input className='w-full p-2 border rounded' type="file" onChange={e => setFile(e.target.files[0])} />
                        <div>
                            <select className='p-2 border rounded w-full' value={cat} onChange={(e) => setCat(e.target.value)}>
                                <option value="">Select Category</option>
                                {/* Options can be dynamically generated */}
                            </select>
                            <button type="button" className='mt-2 bg-black hover:bg-gray-700 text-white p-2 w-full' onClick={addCategory}>Add Selected Category</button>
                        </div>
                        <div className='flex gap-2'>
                            <input className='flex-grow p-2 border rounded' type="text" placeholder='Or enter a new category' value={customCat} onChange={e => setCustomCat(e.target.value)} />
                            <button type="button" className='bg-black hover:bg-gray-700 text-white px-4 py-2' onClick={addCustomCategory}>Add Custom</button>
                        </div>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {cats.map((c, i) => (
                                <div key={i} className='flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <ImCross onClick={() => deleteCategory(i)} className='cursor-pointer' />
                                </div>
                            ))}
                        </div>
                        <textarea className='w-full p-2 border rounded' rows="5" placeholder='Enter post description' value={desc} onChange={e => setDesc(e.target.value)} required />
                        <div className="flex justify-between space-x-4">
                            <button type="submit" className="bg-black hover:bg-gray-700 text-white p-2 flex-1">Update Post</button>
                            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white p-2 flex-1" onClick={confirmCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditPost;
