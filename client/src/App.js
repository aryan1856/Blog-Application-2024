import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home.jsx'
import Login from './pages/login.jsx';
import Register from './pages/register.jsx'
import CreatePost from './pages/create-post.jsx'
import PostDetails from './pages/post-details.jsx'
import EditPost from './pages/edit-post.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import Profile from './pages/profile.jsx'
import CategoryBlogs from './pages/category-blogs.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

const App = () => {
  return (
    <UserContextProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/write' element={<CreatePost />} />
          <Route exact path='/posts/post/:id' element={<PostDetails />} />
          <Route exact path='/edit/:id' element={<EditPost />} />
          <Route exact path='/posts/category/:category' element={<CategoryBlogs/>}/>
          <Route exact path='/myblogs/:id' element={<MyBlogs />} />
          <Route exact path='/profile/:id' element={<Profile />} />

        </Routes>
    </UserContextProvider>
  );
}

export default App;
