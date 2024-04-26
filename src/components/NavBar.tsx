import { useDispatch } from 'react-redux';
import { logout } from '@/components/features/authentication/authActions'
import { useAppDispatch } from '@/app/store';


const Navbar = () => {

  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token')
  };

  return (
    <div className="font-plus-jakarta-sans bg-mapi-neutral-2 border-b-2 border-corner-1-300">
      <div style={{ margin: '0 60px' }} className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img src="src/assets/logo.png" alt="Logo" className="h-8 w-auto mr-4" />
          {/* Navigation Links */}
          <div className="mr-6 text-white font-normal text-xs font-plus-jakarta-sans">MarketPlace</div>
          <div className="mr-6 text-white font-normal text-xs font-plus-jakarta-sans">Create</div>
          <div className="mr-6 text-white font-normal text-xs font-plus-jakarta-sans">Community</div>
          <div className="mr-6 text-white font-normal text-xs font-plus-jakarta-sans">Contact</div>
        </div>
        <div className="flex items-center space-x-6">
          {/* <button className="bg-mapi-neutral-2 text-secondary-blue rounded-xl px-4 py-2 flex items-center border border-corner-1-300 border-0.5 text-sm">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
          <div className="relative">
            <input
              type="text"
              className="bg-mapi-neutral-2 rounded-xl px-4 py-2 pl-10 text-white opacity-75 border border-corner-1-300 border-0.5 text-sm"
              placeholder="Search API"
            />

            <FontAwesomeIcon icon={faSearch} className="text-secondary-blue absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div> */}
          {
            localStorage.getItem('token')
              ?
              <>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gray-400 flex items-center">
                    <img src="/customer.png" alt="User" className="h-full w-full rounded-full" />
                  </div>
                  <div>
                    <p className="text-white font-bold ">John Doe</p>
                    <p className="text-white text-xs opacity-75 ">john.doe@gmail.com</p>
                  </div>
                </div>
                <a href='' onClick={onLogout} className="bg-mapi-secondary-1 text-white opacity-75 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                  Logout
                </a>
              </>
              : <>
                <div className='flex gap-4 '>
                  <a href='/login' className="bg-mapi-secondary-1 text-white opacity-75 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                    Login
                  </a>
                  <a href='/register' className="bg-secondary-blue text-white opacity-75 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                    SignUp
                  </a>
                </div>
              </>
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
