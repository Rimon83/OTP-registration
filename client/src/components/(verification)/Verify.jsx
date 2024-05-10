import React, { useState } from 'react'
import "./verify.css"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Verify = () => {
  const navigate = useNavigate()
  const [otpValue, setOtpValue] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otpValue === ""){
      return toast.error("Please enter OTP ")
    }
    const otp_api = await fetch("http://127.0.0.1:3000/check-OTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({otpValue:otpValue}),
    });
    const res = await otp_api.json()
    if (res.error){
      return toast.error(res.error)
    }
    
    navigate("/home");

    

  }
  const handleChange = (e) => {
    setOtpValue(e.target.value)
  }
 
  return (
    <div className='verify_container'>
     <h2>OTP Verification</h2>
     <form onSubmit={handleSubmit} method="POST">
      <input type="text" name="otpValue" id="" placeholder="Enter OTP" value={otpValue} onChange={handleChange} />
      <div><button type="submit">Verify</button></div>

     </form>
    </div>
  )
}

export default Verify