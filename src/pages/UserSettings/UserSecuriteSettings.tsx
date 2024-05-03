import React from 'react';
import  { useEffect ,useState} from 'react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SideBarUser from '@/components/SideBarUser';
import close from '@/assets/close.png'
import securite from '@/assets/lock.png'
import { UpdateUserSecurity } from '@/components/features/UserSetting/UserSlice';
import { useAppDispatch,RootState } from '@/app/store'; 

const UserSecuritySettings:React.FC  = () => {

    const dispatch = useAppDispatch();


    const [OldPassword, setOldPassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [pasIncorrect,setpasIncorrect] = useState(false)
    const [oldconfirm,setoldconfirm] = useState(false)
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);
    const [Nmdp,setmdp] = useState(false)
      
    const handleDiscard = () => {
        setOldPassword('');
        setnewpassword('');
        setconfirmpassword('');
      };

      const handleUpdateUserSecurity = () => {
        if (OldPassword === '') {
            setoldconfirm(true);
        } else {
            if (newpassword.length < 8) {
                setoldconfirm(false);
                setmdp(true);
                return; 
            }
            
            if (newpassword !== confirmpassword) {
                setmdp(false);
                setpasIncorrect(true);
                setnewpassword('');
                setconfirmpassword('');
                return; 
            }
    
            dispatch(UpdateUserSecurity({
                userSecurityData: {
                    old_password: OldPassword,
                    new_password: newpassword,
                },
            }));
            setVerificationEmailSent(true);
            handleDiscard();
            setpasIncorrect(false);
            setoldconfirm(false);
        }
    }
    

  return (
  <div className='bg-[#0B1739] '>
       <Navbar />
       <div className='flex mt-4'>
       <SideBarUser />
       <div className='mb-20 pt-4 pl-8 ml-2 mr-8 border border-opacity-30 border-[#7E89AC] w-[75%] rounded'> 
            <p className='text-white font-semibold'>Security Settings</p>
            {verificationEmailSent && <p className="text-[#25E130]">Your password has been successfully updated.</p>}
            <div className='flex flex-col mt-6'>
                <label htmlFor="OldPassword" className="mb-2 text-sm text-[#2F80ED]">
                Old Password
                </label>
                <div className='relative w-[50%]'>
                <input
                id="oldpassword"
                name="first_name"
                type="password"
                value={OldPassword} 
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Old Password"
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={securite}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setOldPassword('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
                {oldconfirm && <p className="text-[#FF0000]">Please enter the old password.</p>}
            </div>
            <div className='flex flex-col mt-6'>
                <label htmlFor="newpassword" className="mb-2 text-sm text-[#2F80ED]">
                New Password
                </label>
                <div className='relative w-[50%]'>
                <input
                id="New Password"
                name="newpassword"
                type="password"
                value={newpassword} onChange={e => setnewpassword(e.target.value)}
                placeholder="New Password"
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pb-4">
                    <img src={securite}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pb-4">
                <button onClick={() => setnewpassword('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                {!Nmdp && <p className='font-inter text-xs text-[#7E89AC] mt-1'>Must be at least 8 characters.</p>}
                {Nmdp && <p className='font-inter text-xs text-[#FF0000] mt-1'>Must be at least 8 characters.</p>}

                </div>
                {pasIncorrect && <p className="text-[#FF0000]">Password and confirm password do not match.</p>}

            </div>

            <div className='flex flex-col mt-12'>
                <label htmlFor="ConfirmNewPassword " className="mb-2 text-sm text-[#2F80ED]">
                Confirm New Password  
                </label>
                <div className='relative w-[50%]'>
                <input
                id="ConfirmNewPassword  "
                name="ConfirmNewPassword  "
                type="text"
                value={confirmpassword} onChange={e => setconfirmpassword(e.target.value)}
                placeholder="Confirm New Password  "
                
                className=" w-full bg-[#0B1739] rounded-md border border-[#7E89AC] px-10 py-2 pl-12 text-white focus:outline-none focus:ring-indigo-500 focus:border-blue-500  "
                required 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img src={securite}/>
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button onClick={() => setconfirmpassword('')} className="focus:outline-none"><img className=' hover:opacity-50 active:opacity-75' src={close}/></button>
                </span>
                </div>
            </div>
           
            <div className='flex items-center justify-end pt-10 w-[50%]'>
                     <button onClick={handleDiscard}  className='w-[20%] text-white text-semibold   px-1  py-2 rounded-md ' >Discard</button> 
                     <button onClick={handleUpdateUserSecurity} className='w-[20%] text-white text-semibold bg-[#141943] border border-[#616161]  py-2 rounded-md'>Save</button>

            </div>
       </div>
      
       </div>
       <Footer/> 
  </div>
  );
}

export default UserSecuritySettings;
