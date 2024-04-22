import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//@ts-ignore
import { login } from '../../actions/auth.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setLoginError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(login(credentials));
    if (response && response.error === 'Invalid email or password.') {
      setLoginError(response.error);
    } 
    if (response && response.detail ==='User is not verified!') {
      const confirmAlert = window.confirm('User is not verified! Click on OK to verify your account.');
      if (confirmAlert){
        window.location.href = '/verify/'+response.username;
      }
    }
  };

  const togglePasswordVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    localStorage.getItem('token') ? <>{window.location.href="/"}</> :<>
    <div className="flex min-h-screen bg-[#0B1739] relative">
      <div className="flex w-[85%] bg-cover bg-no-repeat relative" style={{ backgroundImage: `url(/src/assets/loginBg.png)`, zIndex: '1' }}>
        <div className="w-full h-full bg-[#0B1739] opacity-25" />
      </div>
      <div className="flex flex-col justify-center items-start w-full lg:w-[45%] px-10 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
        <p className="text-lg text-gray-300 mb-10">
          Hello again, Login to your account.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col relative">
            <label htmlFor="email" className={`text-sm mb-2 ${focusedField === 'email' ? 'text-blue-400' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faEnvelope} className="absolute top-10 left-3" />
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className="appearance-none rounded-md border border-gray-700 px-10 py-2 pl-9 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className={`text-sm mb-2 ${focusedField === 'password' ? 'text-blue-400' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faLock} className="absolute top-10 left-3 z-10" /> {/* Added z-10 for higher z-index */}
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                className="appearance-none rounded-md border border-gray-700 px-10 py-2 pl-9 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onMouseDown={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-opacity-50"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-300"
              >
                Remember Me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-2 text-center text-white text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
