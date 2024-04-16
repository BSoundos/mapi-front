import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore                 //to handle the import error
import { verify } from '../../actions/auth.js';
import { useParams } from 'react-router-dom'; // Import useParams
import './Verify.css';

const Verify = () => {
  const [credentials, setCredentials] = useState({ username: '', verification_code: '' });
  const dispatch = useDispatch();
  const { username } = useParams(); // Get the 'username' parameter from the URL

  useEffect(() => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      username: username || '',
    }));
  }, [username]);

  const handleChange = (index: number, value: string) => {
    // Handle input change for each verification code field
    const updatedVerificationCode =
      credentials.verification_code.slice(0, index) + value + credentials.verification_code.slice(index + 1);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      verification_code: updatedVerificationCode,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the verify action with the credentials
    dispatch(verify(credentials));
  };

  return (
    <div className="create-account-section">
      <div className="image-placeholder"></div>
      <div className="create-account-form">
        <div className="headline-subhead">
          <div className="headline">Verify Your Email Address</div>
          <div className="subhead">We sent you a 6 digit code to verify your email address:</div>
          <div className="subhead">Enter in the field below.</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="typeforms">
            {[...Array(6)].map((_, index) => (
              <div className="typeform" key={index}>
                <input
                  type="text"
                  maxLength={1}
                  value={credentials.verification_code[index] || ''}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="frame-152">
            <div>Didn’t get the code? Resend</div>
            <div>Expires in 01:00</div>
          </div>
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
