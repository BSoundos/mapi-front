import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verify } from '../../actions/auth.js';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const [credentials, setCredentials] = useState({ username: '', verification_code: '' });
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      username: username || '',
    }));
  }, [username]);

  const handleChange = (index: number, value: string) => {
    const updatedVerificationCode =
      credentials.verification_code.slice(0, index) + value + credentials.verification_code.slice(index + 1);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      verification_code: updatedVerificationCode,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(verify(credentials));
  };

  return (
    <div className="flex min-h-screen bg-[#141943] text-inter">
      <div className="image-placeholder min-w-[583px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(/src/assets/verifyBg.png)` }}></div>
      <div className="create-account-form flex flex-col items-start justify-center p-10 gap-2">
        <div className="headline-subhead text-white">
          <div className=" text-6xl font-bold mb-6">Verify Your Email Address</div>
          <div className="mb-9">We sent you a 6 digit code to verify your email address:</div>
          <div className="">Enter in the field below.</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          <div className="typeforms flex gap-2">
            {[...Array(6)].map((_, index) => (
              <div className="typeform border border-gray-700 rounded-md w-12 h-12 flex items-center justify-center" key={index}>
                <input
                  type="text"
                  maxLength={1}
                  value={credentials.verification_code[index] || ''}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full h-full bg-transparent outline-none text-white text-center text-2xl"
                />
              </div>
            ))}
          </div>
          <button type="submit" className="bg-[#8F00FF] hover:bg-[#7A00CC] text-white rounded-full py-3 px-6 text-lg font-semibold transition duration-300 ease-in-out">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
