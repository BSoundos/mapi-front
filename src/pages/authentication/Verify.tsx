import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { verify } from '@/components/features/authentication/authActions';
import { useAppDispatch } from '@/app/store';
import verifyBgImg from '@/assets/verifyBg.png';

const Verify = () => {
  const [credentials, setCredentials] = useState({ username: '', verification_code: Array(6).fill('') });
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState('');
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);


  useEffect(() => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      username: username || '',
    }));
  }, [username]);

  const handleChange = (index: number, value: string) => {
    const updatedVerificationCode = [...credentials.verification_code];
    updatedVerificationCode[index] = value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      verification_code: updatedVerificationCode,
    }));

    // Move to the next input field
    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    setVerificationError('');
    setVerificationSuccess('');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('Text').slice(0, 6);
    const updatedVerificationCode = [...pasteData.split(''), ...credentials.verification_code.slice(pasteData.length)];
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      verification_code: updatedVerificationCode,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(verify({ ...credentials, verification_code: credentials.verification_code.join('') }));
      if (response && response.msg === 'user is verified! ') { // The space in this (response.msg === 'user is verified! ') is OBLIGATORY 
        setVerificationSuccess('The code is correct!');
        setTimeout(() => {
          localStorage.removeItem("verificationNeeded")
          window.location.href = '/login';
        }, 2000);
      }
      if (response && response.msg === 'Verification code does not match') {
        setVerificationError(response.msg);
      }
      if (response && response.msg === 'user or provider does not exist') {
        alert('User or provider does not exist! Click on OK or refresh the page to register again.');
        setTimeout(() => {
          window.location.href = '/register';
        });
      }
    } catch (error: any) {
    }
  };




  return (
    localStorage.getItem('verificationNeeded') ? <>
      <div className="flex min-h-screen bg-[#141943] text-inter">
        <div className="image-placeholder min-w-[583px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${verifyBgImg})` }}></div>
        <div className="create-account-form flex flex-col items-start justify-center p-10 gap-2">
          <div className="headline-subhead text-white">
            <div className=" text-6xl font-bold mb-6">Verify Your Email Address</div>
            <div className="mb-9 text-2xl">We sent you a 6 digit code to verify your email address:</div>
            <div className="text-lg">Enter in the field below.</div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
            <div className="typeforms flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="typeform border border-gray-700 rounded-md w-12 h-12 flex items-center justify-center" key={index}>
                  <input
                    type="text"
                    maxLength={1}
                    value={credentials.verification_code[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onPaste={handlePaste}
                    className={`w-full h-full bg-transparent outline-none text-center text-2xl ${verificationSuccess ? 'text-green-500' : 'text-white'
                      }`}
                    required
                    ref={(input) => (inputRefs.current[index] = input)}
                  />
                </div>
              ))}
            </div>
            {verificationError && <p className="text-red-500 text-sm">{verificationError}</p>}
            {verificationSuccess && <p className="text-green-500 text-sm">{verificationSuccess}</p>}
            <button type="submit" className="bg-[#8F00FF] hover:bg-[#7A00CC] text-white rounded-full py-3 px-6 text-lg font-semibold transition duration-300 ease-in-out">Submit</button>
          </form>
        </div>
      </div>
    </> : <>{window.location.href = "/"}</>
  );
};

export default Verify;
