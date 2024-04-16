import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore                 //to handle the import error
import { register } from '../../actions/auth.js';
import './Register.css';
const Register = () => {
  const [credentials, setCredentials] = useState({ 
    role:'',
    email: '',
    username:'', 
    password: '',  
    first_name: '', 
    last_name: '', 
    contact_info: '', 
    confirmPassword:''
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.confirmPassword !== credentials.password) {
      console.log("Passwords do not match");
      return;
    }
    dispatch(register(credentials)); 
  };

  return (
    <div className='container' >
      <div className="image-placeholder"></div>
      <div className='form-container'>
        <div className="headline-subhead">
            <div className="headline">Create Account</div>
            <div className="subhead">Welcome! Enter your details to enjoy the features of the site!</div>
        </div>
      
        <form onSubmit={handleSubmit} className="register-form">
          <div className="mb-4">
            <label>
            User Type
            </label>
            <br />
            <div id="Type-user" onChange={handleChange}>
              <input type="radio" value="user" name="role" /> User
              <input type="radio" value="provider" name="role" /> Provider
            </div>
            <br />
            <label htmlFor="firstName">
              First Name
            </label>
            <br />
            <input id="firstName" name="first_name" type="text" placeholder="First Name" onChange={handleChange} />
            <br />
            <label htmlFor="lastName">
              Last Name
            </label>
            <br />
            <input id="lastName" name="last_name" type="text" placeholder="Last Name" onChange={handleChange} />
            <br />
            <label htmlFor="username">
              Username
            </label>
            <br />
            <input id="username" name="username" type="text" placeholder="Username" onChange={handleChange} />
            <br />
            <label htmlFor="email">
              Email
            </label>
            <br />
            <input id="email" name="email" type="text" placeholder="Email" onChange={handleChange}  required/>
            <br />
            <label htmlFor="contact_info">
              Phone Number
            </label>
            <br />
            <input id="contact_info" name="contact_info" type="text" placeholder="Phone Number" onChange={handleChange} />
            <br />
            <label htmlFor="password">
              Password
            </label>
            <br />
            <input id="password" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <br />
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <br />
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;