import React, { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'

const AuthForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(null)

  async function handleSubmit(endpoint) {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${endpoint}`,
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCookie('Email', response.data.email)
      setCookie('Token', response.data.token)

      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }




  function signOut() {
    removeCookie('Email')
    removeCookie('Token')
    window.location.reload()
  }

  return (
    <div className="auth_form">
      <h2>{cookies.Token ? `Welcome,${cookies.Email} ` : ''}</h2>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="password"
      /> 
      <br></br>
      <button onClick={() => handleSubmit('signup')}>Sign up</button>
      <button onClick={() => handleSubmit('login')}>Log in</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default AuthForm;
