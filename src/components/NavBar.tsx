import { logout } from '@/components/features/authentication/authActions'
import { useAppDispatch } from '@/app/store';
import logo from '@/assets/logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('role');

  };
  const location = useLocation();
  const pathname = location.pathname;
  const first_name = localStorage.getItem('first_name');
  const last_name = localStorage.getItem('last_name');
  const email = localStorage.getItem('email');
 

  const items = [
    { text: 'MarketPlace', path: '/apis' },
    { text: 'Create', path: '/my-apis' },
    { text: 'Community', path: '/community' },
    { text: 'Contact', path: '/contact' },
  ];
  const role=localStorage.getItem('role');

  return (
    <div className="font-plus-jakarta-sans bg-mapi-neutral-2 border-b-2 border-corner-1-300">
      <div style={{ margin: '0 60px' }} className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/apis">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-4" />
          </Link>
          {/* Navigation Links */}
          <div className="flex gap-5">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`font-semibold text-sm pb-2 mr-3 ${
                pathname === item.path
                  ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3 '
                  : 'text-white'
              }`}
            >
              <span className="">{item.text}</span>
            </Link>
          ))}
        </div>
        </div>
        <div className="flex items-center">
        
          {
            localStorage.getItem('token')
              ?
              <Link
              to={role === 'provider' ? '/my-apis' : '/userProfileSettings'}
              className='flex '
            >
              <div className="flex gap-4 justify-center ">
                <div className="rounded-lg bg-blue-500 bg-opacity-20 w-10 h-10 flex justify-center items-center">
                  <span className="text-white text-sm font-bold">{last_name.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-semibold text-base">{first_name + " " + last_name}</h4>
                  <p className="text-mapi-neutral-4 font-semibold text-xs -mt-0.5">{email}</p>
                </div>
              </div>
              <Link
                to='/'
                onClick={onLogout}
                className="bg-mapi-secondary-1 text-white opacity-75 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm ml-10"
              >
                Logout
              </Link>
            </Link>
              : <>
                <div className='flex gap-4 '>
                  <Link to='/login' className="bg-mapi-secondary-1 text-white opacity-75 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                    Login
                  </Link>
                  <Link to='/register' className="bg-secondary-blue text-white opacity-75 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                    SignUp
                  </Link>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
