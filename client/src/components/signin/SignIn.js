import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import client from './apolloClient';
import axios from 'axios';


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
      // navigate()
      // Continue with further actions or navigate to another page
    } catch (error) {
      console.log('Error:', error.message);
      // Handle the error
      navigate("/address")
    }
  };

  return (
   <div> 
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
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
  );
}

export default SignIn;
