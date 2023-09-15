import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const Login = ({setIsAuth, isAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("login successfull");

        localStorage.setItem("isAuth", true);
        setIsAuth(true);

        navigate("/tasks")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };
  return (
    <div>
      <div className="bg-gray-100 w-[30%] h-[38vh] flex flex-col gap-5 items-center p-10 absolute top-20 right-[38%] rounded-md">
        <input
          className="text-black w-full p-2 rounded border border-black"
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="text-black w-full p-2 rounded border border-black"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          className="bg-teal-300 hover:bg-teal-400 hover:text-white p-2 px-4 rounded-md"
          onClick={userLogin}
        >
          Login
        </button>
        <Link to="/signup">
          <button className="py-1 px-3 hover:bg-white rounded-md">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
