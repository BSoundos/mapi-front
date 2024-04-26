import React, { useState } from 'react';
import { register } from '@/components/features/authentication/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faRocket, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@/app/store';

const Register = () => {
  const [credentials, setCredentials] = useState({
    role: 'user',
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    contact_info: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordMatchError(false);
    }
    if (e.target.name === 'username') {
      setUsernameError('');
    }
    if (e.target.name === 'email') {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.confirmPassword !== credentials.password) {
      setPasswordMatchError(true);
      return;
    }
    try {
      const response = await dispatch(register(credentials));
      console.log('Response:', response);
      if (response) {
        if (response.username) {
          console.log(" Username error:", response.username[0]);
          setUsernameError(response.username[0]);
        }
        if (response.email) {
          console.log(" Email error:", response.email[0]);
          setEmailError(response.email[0]);
        }
      }

    } catch (error: any) {
      console.error('Error registering user in the register page:', error.response);
    }
  };


  const togglePasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    localStorage.getItem('token') ? <>{window.location.href = "/"}</> : <>
      <div className="flex min-h-screen bg-[#0B1739] gap-9">
        <div className="flex w-[75%] bg-cover bg-no-repeat bg-center m" style={{ backgroundImage: `url(/src/assets/registerBg.png)` }}>
          <div className="w-full h-full  opacity-25" />
        </div>
        <div className="flex flex-col justify-center items-start w-[55%] px-10 mt-9 -ml-40">
          <h1 className="text-6xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-2xl text-gray-300 mb-10">
            Welcome! Enter Your Details To Enjoy The Features Of The Site!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div className="flex flex-row -space-x-0.5">
              <button
                type="button"
                className={`flex-grow border rounded-l-lg py-2 text-sm text-white focus:outline-none `}
                style={{ background: 'transparent', border: credentials.role === 'user' ? '2px solid #2F80ED' : ' 2px solid white' }}
                onClick={() => setCredentials({ ...credentials, role: 'user' })}
              >
                User
              </button>
              <button
                type="button"
                className={`flex-grow border rounded-r-lg py-2 text-sm text-white focus:outline-none `}
                style={{ background: 'transparent', border: credentials.role === 'provider' ? '2px solid #2F80ED' : '2px solid white' }}
                onClick={() => setCredentials({ ...credentials, role: 'provider' })}
              >
                Provider
              </button>
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="firstName" className="mb-2 text-sm text-[#2F80ED]">
                First Name
              </label>
              <FontAwesomeIcon icon={faUser} className={`absolute top-10 left-3 ${focusedField === 'firstName' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="firstName"
                name="first_name"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                onFocus={() => handleFocus('firstName')}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="lastName" className="mb-2 text-sm text-[#2F80ED]">
                Last Name
              </label>
              <FontAwesomeIcon icon={faUser} className={`absolute top-10 left-3 ${focusedField === 'lastName' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="lastName"
                name="last_name"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                onFocus={() => handleFocus('lastName')}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="username" className="mb-2 text-sm text-[#2F80ED]">
                Username
              </label>
              <FontAwesomeIcon icon={faUser} className={`absolute top-10 left-3 ${focusedField === 'username' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                onFocus={() => handleFocus('username')}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
              {usernameError && <p className="text-red-500 text-xs ml-2">{usernameError}</p>}
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="email" className="mb-2 text-sm text-[#2F80ED]">
                Email
              </label>
              <FontAwesomeIcon icon={faEnvelope} className={`absolute top-10 left-3 ${focusedField === 'email' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
              {emailError && <p className="text-red-500 text-xs ml-2">{emailError}</p>}
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="contact_info" className="mb-2 text-sm text-[#2F80ED]">
                Phone Number
              </label>
              <FontAwesomeIcon icon={faPhone} className={`absolute top-10 left-3 ${focusedField === 'contact_info' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="contact_info"
                name="contact_info"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
                onFocus={() => handleFocus('contact_info')}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
              />
              <p className='text-xs mt-2 ml-4 text-[#7E89AC]'>This field is optional.</p>
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="password" className="mb-2 text-sm text-[#2F80ED]">
                Password
              </label>
              <FontAwesomeIcon icon={faLock} className={`absolute top-10 left-3 ${focusedField === 'password' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute top-10 right-3 cursor-pointer text-gray-500"
                onMouseDown={togglePasswordVisibility}
              />
              <p className='text-xs mt-2 ml-4 text-[#7E89AC]'>Must be at least 8 characters.</p>
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="confirmPassword" className="mb-2 text-sm text-[#2F80ED]">
                Confirm Password
              </label>
              <FontAwesomeIcon icon={faLock} className={`absolute top-10 left-3 ${focusedField === 'confirmPassword' ? 'text-[#2F80ED]' : 'text-gray-500'}`} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                onChange={handleChange}
                onFocus={() => handleFocus('confirmPassword')}
                className="rounded-md border border-gray-700 px-10 py-2 pl-12 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="absolute top-10 right-3 cursor-pointer text-gray-500"
                onMouseDown={toggleConfirmPasswordVisibility}
              />
            </div>
            {passwordMatchError && <p className="text-red-500 text-sm">Passwords do not match</p>}
            <div className="flex flex-row items-center mt-4">
              <button
                type="submit"
                className="w-full mt-7 mb-20 rounded-full bg-[#8F00FF] py-2 text-center text-white text-lg font-medium hover:bg-[#a455e1] focus:outline-none focus:ring-2 focus:ring-[#a455e1] focus:ring-opacity-50"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
