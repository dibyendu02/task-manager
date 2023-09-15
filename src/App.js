import logo from './logo.svg';
import './App.css';
import Tasks from './components/Tasks';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useState } from 'react';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
          <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth}/>} />
          <Route path="/tasks" element={<TaskPage isAuth={isAuth} setIsAuth={setIsAuth}/>} />
          <Route path="/signup" element={<Signup isAuth={isAuth} setIsAuth={setIsAuth}/>} />
          <Route  path="/login" element={<Login setIsAuth={setIsAuth} isAuth={isAuth}/>} />
          
        </Routes> 
    </Router> 
    
      
    
  );

}

export default App;

