import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import client from './apolloClient';
import axios from 'axios';
import "./css/signin.css";

function SignIn() {
 
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
 const navigate = useNavigate();
const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/get_auth_token', {
        email,
        password,
      });
      const  authToken  = response.data;
      console.log('Auth Token:', authToken);
      navigate(-1);
      // Continue with further actions or navigate to another page
    } catch (error) {
      console.log('Error:', error.message);
      // Handle the error
      alert("Invalid Credentials")
    }
  };

  return (
   <div className = "signin-container"> 
   <div className = "signin">
   <div className = "login-header">
    <div className = "signin-brand-logo"><center><img src='./assets/icons/brand-logo.svg' alt = "Milanese" /></center></div>
    <div className ="login-header-text"><center><span>Login to continue</span></center></div>
    </div>
    <div className="login-form">
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
    </form>
    </div>
    <div className='signup-btn'><center><span>Don't have an account?</span><b><span onClick={()=>{navigate('/signup')}}>Signup</span></b></center></div>
    </div>
</div>
  );
}

export default SignIn;
