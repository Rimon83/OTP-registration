import React, { useState } from "react";
import "./register.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault()
   if (userDetails.username === "" || userDetails.email === "" || userDetails.password === ""){
    return toast.error("Username, Email, and Password are required")
   }

    const register_api = await fetch("http://127.0.0.1:3000/register", {
     method: "POST",
     headers: {'Content-Type' : 'application/json'},
     body: JSON.stringify(userDetails)
    })

    const res = await register_api.json()
    if (res.error){
     return toast.error(res.error)
    }

    // If no error, navigate to verify page 
    navigate('/verify')
    

   }
  


  return (
    <div className="register_form">
      <form method="POST" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ana John"
            value={userDetails.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={userDetails.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            type="text"
            id="password"
            name="password"
            placeholder="password"
            value={userDetails.password}
            onChange={handleChange}
          />
        </label>
        <div className="register_button">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
