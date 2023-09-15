import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validemail, setValidemail] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Check if the input value matches the email pattern
    const isEmailValid = emailPattern.test(inputValue);

    // Update the isValid state based on the validation result
    setIsValid(isEmailValid);
  };

  const createUser = ({ setIsAuth, isAuth }) => {
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...

          console.log("signup succesfull");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorMessage);
        });
    
  };


  return (
    <div>
      <div className="bg-gray-100 w-[30%] h-[38vh] flex flex-col gap-5 items-center p-10 absolute top-20 right-[38%] rounded-md">
        <div className="w-full">
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="email"
            // onChange={(event) => {
            //   setEmail(event.target.value);
            // }}
            onChange={handleEmailChange}
          />
          {!isValid && (
            <p className="text-red-700 text-xs">enter a valid email</p>
          )}
        </div>
        <div className="w-full">
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);

              if(password.length >= 5){
                setValidPassword(true)
                console.log("hello")
              }
              
              else if(password.length < 5){
                setValidPassword(false)
              }
            }}
          />
          {!validPassword && (
            <p className="text-red-700 text-xs">atleast enter 6 digits</p>
          )}
        </div>

        <button
          className="bg-teal-300 hover:bg-teal-400 hover:text-white p-2 px-4 rounded-md"
          onClick={createUser}
        >
          Register
        </button>
        <Link to="/login">
          <button className="py-1 px-3 hover:bg-white rounded-md">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
