import { signOut } from 'firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase.config';

const Navbar = ({ isAuth, setIsAuth }) => {
  const signout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  return (
    <div className="h-16  bg-white drop-shadow-md flex justify-between px-10 items-center ">
        <div>
            <Link to="/">
                <h1 className=" text-xl">Task Management System</h1>
            </Link>
            
        </div>
        
        <ul className="flex gap-5 ">
            
            <li><Link to="/">Home</Link></li>
            {isAuth && <li><Link to="/tasks">Tasks</Link></li>}
            
            {!isAuth && <li><Link to="/login">Login</Link></li>}
            {isAuth && <li onClick={signout}><Link to="/login">Logout</Link></li>}
        </ul>
        
    </div>
  )
}

export default Navbar