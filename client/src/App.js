import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/home.jsx'
import Login from './pages/login.jsx';
import Register from './pages/register.jsx'
import CreatePost from './pages/create-post.jsx'
import PostDetails from './pages/post-details.jsx'
import EditPost from './pages/edit-post.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import Profile from './pages/profile.jsx'

function App() {
  return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/write' element={<CreatePost/>}/>
        <Route exact path='/Post/post/:id' element={<PostDetails/>}/>
        <Route exact path='/edit/:id' element={<EditPost/>}/>
        <Route exact path='/myblogs/:id' element={<MyBlogs/>}/>
        <Route exact path='/profile/:id' element={<Profile/>}/>
      </Routes>
  );
}

export default App;
