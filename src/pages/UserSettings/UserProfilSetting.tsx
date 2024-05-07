import React from 'react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SideBarUser from '@/components/SideBarUser';
import person from '@/assets/person.png'
import close from '@/assets/close.png'
import phone from '@/assets/mobile-button.png'
import email from '@/assets/email.png'
import  { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserSettings, GetInformationUser } from '@/components/features/UserSetting/UserSlice';
import { useAppDispatch,RootState } from '@/app/store'; 
import {User} from '@/types/user';

const UserProfilSetting:React.FC  = () => {
    const username = localStorage.getItem('username');
    

    const dispatch = useAppDispatch();

    const [verificationEmailSent, setVerificationEmailSent] = useState(false);

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [userInfo, setUserInfo] = useState<User>(null);

    //dispatcher les information user
    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
           
            const userInfo = await GetInformationUser(username);
            setNewLastName(userInfo.last_name)
            setNewFirstName(userInfo.first_name)
            setNewEmail(userInfo.email)
            setNewPhoneNumber(userInfo.contact_info)
            setNewUsername(userInfo.username)
            setUserInfo(userInfo);
            console.log(userInfo)
            dispatch({ type: 'USER_INFO_FETCHED', payload: userInfo });
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        };
    
        fetchUserInfo(); 
      }, [dispatch]);


    const handleDiscard = () => {
      if (userInfo) {
        setNewFirstName(userInfo.first_name);
        setNewLastName(userInfo.last_name);
        setNewUsername(userInfo.username);
        setNewEmail(userInfo.email);
        setNewPhoneNumber(userInfo.contact_info);
    }
      };

      const handleUpdateUserSettings = () => {
        setVerificationEmailSent(false)
        dispatch(updateUserSettings({
          oldUsername: username,
          userData: {
              firstName: newFirstName,
              lastName: newLastName,
              username: newUsername,
              email: newEmail,
              phoneNumber: newPhoneNumber,
          },
      }));
      
      setVerificationEmailSent(true);
      handleDiscard();
      }
      

  return (
  <div className='bg-[#0B1739] '>
       <Navbar />
       <div className='flex mt-4'>
       <SideBarUser />
       <div className='mb-20 pb-20 pt-4 pl-8 ml-2 mr-8 border border-opacity-30 border-[#7E89AC] w-[75%] rounded'> 
            <p className='text-white font-semibold'>Basic Informations</p>
            {verificationEmailSent && <p className="text-[#25E130]">Changes to the fields have been successfully applied.</p>}
            <div className='flex flex-col mt-4'>
                <label htmlFor="firstName" className="mb-2 text-sm text-[#2F80ED]">
                First Name
                </label>
                <div className='relative w-[50%]'>
                <input
                id="firstName"
                name="first_name"
                type="text"
                placeholder="First Name"
                value={newFirstName} onChange={e => setNewFirstName(e.target.value)}
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={person}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setNewFirstName('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="Last Name" className="mb-2 text-sm text-[#2F80ED]">
                Last Name
                </label>
                <div className='relative w-[50%]'>
                <input
                id="Last Name"
                name="last_name"
                type="text"
                value={newLastName} onChange={e => setNewLastName(e.target.value)}
                placeholder="Last Name"
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={person}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setNewLastName('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="username  " className="mb-2 text-sm text-[#2F80ED]">
                User Name  
                </label>
                <div className='relative w-[50%]'>
                <input
                id="username  "
                name="username  "
                type="text"
                value={newUsername} onChange={e => setNewUsername(e.target.value)}
                placeholder="User Name  "
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={person}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setNewUsername('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="email  " className="mb-2 text-sm text-[#2F80ED]">
                Email  
                </label>
                <div className='relative w-[50%]'>
                <input
                id="Email  "
                name="email  "
                type="text"
                value={newEmail} onChange={e => setNewEmail(e.target.value)} 
                placeholder="Email  "
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={email}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setNewEmail('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="Phone Number   " className="mb-2 text-sm text-[#2F80ED]">
                Phone Number   
                </label>
                <div className='relative w-[50%]'>
                <input
                id="Phone-Number   "
                name="phone_number   "
                type="text"
                value={newPhoneNumber} onChange={e => setNewPhoneNumber(e.target.value)}
                placeholder="Phone Number   "
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={phone}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setNewPhoneNumber('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
            </div>
            <div className='flex items-center justify-end pt-10 w-[50%]'>
            <button onClick={handleDiscard} className='w-[20%] text-white text-semibold   px-1  py-2 rounded-md ' >Discard</button> 
                     <button onClick={handleUpdateUserSettings} className='w-[20%] text-white text-semibold bg-[#141943] border border-[#616161]  py-2 rounded-md'>Save</button> 
                     {status === 'loading' && <p>Loading...</p>}
                     {status === 'failed' && <p>Failed to update settings. Please try again later.</p>}

            </div>
       </div>

       </div>
       <Footer/> 
  </div>
  );
}

export default UserProfilSetting;
