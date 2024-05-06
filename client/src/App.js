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
import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => {
  return (
    <UserContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoute/>} >
              <Route path='write' element={<CreatePost />} />
              <Route path='posts/post/:id' element={<PostDetails />} />
              <Route path='edit/:id' element={<EditPost />} />
              <Route path='posts/category/:category' element={<CategoryBlogs/>}/>
              <Route path='myblogs/:id' element={<MyBlogs />} />
              <Route path='profile/:id' element={<Profile />} />
          </Route>
        </Routes>
    </UserContextProvider>
  );
}

export default App;
