import logo from '@/assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidDashboard, BiUser } from "react-icons/bi";
import avatarImg from '@/assets/customer.png';
import { useAppDispatch } from '@/app/store';
import { logout } from './features/authentication/authActions';


function AdminSideBar() {

  const dispatch = useAppDispatch()

  
  const location = useLocation();
  const pathname = location.pathname;

  const first_name = localStorage.getItem('first_name');
  const last_name = localStorage.getItem('last_name');
  const email = localStorage.getItem('email');

  const items = [
    { icon: <BiSolidDashboard size={24} />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <BiUser size={24} />, text: 'Users', path: '/admin/users' },
    { icon: <BiUser size={24} />, text: 'Providers', path: '/admin/providers' },
  ];


  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <div className="flex-1 max-w-[260px] min-w-[260px] overflow-auto">
      <div className="bg-mapi-neutral-2 border-solid border-r-[#343B4F] border-r h-screen overflow-hidden flex flex-col justify-between pb-3 text-sm">
        <div>
          <div className="logo flex justify-center items-center pt-6 pb-8">
            <img src={logo} alt="Logo" />
          </div>

          <div className="flex flex-col justify-center">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center text-md p-3 mr-5 ml-3 rounded-lg font-semibold ${
                  pathname === item.path ? 'bg-mapi-secondary-1 bg-opacity-50 text-mapi-secondary-3 shadow-link' : 'text-mapi-neutral-4'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.text}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Content at the Bottom */}
        <div className='flex flex-col justify-center'>
          <div className="flex items-center space-x-3 px-3 py-4 ml-3 ">
                <div className="rounded-lg bg-blue-500 bg-opacity-20 w-10 h-10 flex justify-center items-center">
                  <span className="text-white text-sm font-bold">{last_name.charAt(0)}</span>
                </div>
            <div>
              <p className="text-white font-bold">{first_name}  {last_name}</p>
              <p className="text-white text-xs opacity-75">{email}</p>
          
            </div>
          
          </div>
          
            <button className="w-41 py-2 rounded-lg border border-gray-400 border-opacity-50 text-white font-bold hover:bg-gray-400 hover:text-white mb-2 mx-3">
                Settings
            </button>
            

            <Link
              to='/'
              onClick={onLogout}
              className="w-41 py-2 rounded-lg border border-gray-400 border-opacity-50 text-white font-bold hover:bg-gray-400 hover:text-white mx-3"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <span style={{ margin: 'auto' }}>Logout</span>
            </Link>
          
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;