import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from '../../Api/Axios';
import './login.css';

export default function SignInOrSignUp() {
  const [inputValue, setInputValue] = useState('');
  const [redirect, setRedirect] = useState(false);

  if(localStorage.getItem('RefreshToken') && localStorage.getItem('AccessToken')){
    return <Navigate to="LandingPage/" />;
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await Axios.post('user_authentication/login/', { credential: inputValue });
      
      if (response.status === 201) {
        localStorage.setItem('TempUserid', response.data.user_id);
        setRedirect(true);

      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (redirect) {
    return <Navigate to="/otpVarify/" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Secure Your Digital Life</h1>
          <p>"The best password is the one you never have to remember."</p>
        </div>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="email-or-phone">Email</label>
            <input
              type="text"
              id="email-or-phone"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your email or phone"
              required
            />
          </div>
          <button className="Btn1" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}
