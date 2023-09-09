import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/signin.css';

import {AiOutlineEyeInvisible} from "react-icons/ai";
import {AiOutlineEye} from "react-icons/ai";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiSuccess, setApiSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/get_auth_token', {
        email,
        password,
      });

      const authToken = await response.data;
      if (authToken) {
        navigate(-1);
      }
      setApiSuccess(true); // Set the state to indicate successful API call
    } catch (error) {
      console.log('Error:', error.message);
      alert('Invalid Credentials');
    }
  };

  useEffect(() => {
    if (apiSuccess) {
      navigate(-1);
    }
  }, [apiSuccess, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <div className="signin">
        <div className="login-header">
          <div className="signin-brand-logo">
            <center>
              <img src="./assets/icons/brand-logo.svg" alt="Milanese" />
            </center>
          </div>
          <div className="login-header-text">
            <center>
              <span>Login to continue</span>
            </center>
          </div>
        </div>
        <div className="login-form">
          <form>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={`password-toggle ${showPassword ? 'visible' : ''}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
              </span>
            <button onClick={handleSignIn}>Sign In</button>
          </form>
        </div>
        <div className="signup-btn">
          <center>
            <span>Don't have an account?</span>
            <b>
              <span onClick={() => navigate('/signup')}>Signup</span>
            </b>
          </center>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
