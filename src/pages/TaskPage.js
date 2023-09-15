import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Tasks from '../components/Tasks'
import { useNavigate } from 'react-router-dom';

const TaskPage = ({setIsAuth, isAuth}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
          navigate("/login");
        }
      }, []);
  return (
    <>
        <Tasks/>
    </>
  )
}

export default TaskPage