import React, { useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Axios from '../../Api/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch } from 'react-redux';
import { get_UserDetails } from '../../Redux/UserSlice';

import './otp.css';
import { Navigate } from 'react-router-dom';

export default function OtpVerification() {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [redirect, setRedirect] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;

    if (/[^a-zA-Z0-9]/.test(value)) {
      return;
    }

    let newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.keyCode === 8 && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      otp: otp.join(''),
      user_id: localStorage.getItem('TempUserid')
    };
    try {
      const response = await Axios.post('user_authentication/verify/', form);
      const data = response.data;
      if (response.status === 200) {
        localStorage.removeItem('TempUserid');
        localStorage.setItem('AccessToken', data.access_token);
        localStorage.setItem('RefreshToken', data.refresh_token)
        toast.success("OTP Verified Successfully");
        const decodedToken = jwtDecode(data.access_token);
        const user_cred = decodedToken.user_cred;
        const user_id = decodedToken.user_id;

        dispatch(get_UserDetails({
          user_cred,
          user_id,
        }));

        setRedirect(true);

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning("The OTP has expired or is invalid.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="LandingPage/" />;
  }

  return (
    <div className="otp-container">
      <ToastContainer /> 
      <div className="otp-header">
        <h1>Verify Your Identity</h1>
        <p>"Security is not a product, but a process."</p>
      </div>
      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-input-container">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={el => inputRefs.current[index] = el}
              className="otp-input"
            />
          ))}
        </div>
        <button type="submit" className="Btn">Verify OTP</button>
      </form>
    </div>
  );
}
