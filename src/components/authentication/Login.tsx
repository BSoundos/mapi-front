// Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore                 //to handle the import error
import { login } from '../../actions/auth.js';
import'./Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(credentials)); 
  };

  return (
    <div className='container'>
      <div className="image-placeholder-login"></div>
      <div className='form-container'>
        <div className="headline-subhead">
            <div className="headline">Welcome Back!</div>
            <div className="subhead">Hello again, Login to your account.</div>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <div>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} /><br />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
