import logo from "@/assets/logo.png";
import { Link,useLocation } from 'react-router-dom';
import { PiBarcode } from "react-icons/pi";
import { BiSolidDashboard ,BiDollar ,BiSupport} from "react-icons/bi";
import { IoBag } from "react-icons/io5";
import { logout } from "@/components/features/authentication/authActions";
import { useAppDispatch } from "@/app/store";

function SideBarPro() {
  const location = useLocation();
  const pathname = location.pathname;
  const first_name = localStorage.getItem('first_name');
  const last_name = localStorage.getItem('last_name');
  const email = localStorage.getItem('email');
 

  const items = [
    { icon:<BiSolidDashboard size={24} />,text: 'Dashboard', path: '/dashboard' },
    { icon:<IoBag size={24} /> ,text: 'My APIs', path: '/my-apis' },
    {icon:<BiDollar size={24} />, text: 'Billing & Incomes', path: '/billing-incomes' },
    { icon: <BiSupport size={24} />, text: 'Ticket System', path: '/Tickets' },
  ];
  const dispatch=useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token')
  };


  return (
    <div className="flex-1 max-w-[260px]  h-screen ">
      <div className="bg-mapi-neutral-2  border-solid border-r-[#343B4F] border-r h-screen overflow-hidden flex flex-col justify-between pb-3 text-sm">
        <div>
        <div className="logo flex justify-center items-center pt-4 pb-8">
          <img src={logo} alt="Logo" />
        </div> 

        <div className="flex flex-col justify-center ">
        {items.map((item, index) => (
      <Link
      key={index}
      to={item.path}
      className={`flex items-center text-md p-3 mr-5 ml-3 rounded-lg font-semibold ${
        (item.text === 'My APIs' &&
          (pathname === '/my-apis' || pathname.includes('api'))) ||
        pathname === item.path
          ? 'bg-mapi-secondary-1 bg-opacity-50 text-mapi-secondary-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_4px_8px_0_rgba(0,0,0,0.1)] '
          : 'text-mapi-neutral-4'
      }`}
    >
      {item.icon}
      <span className="ml-3">{item.text}</span>
    </Link>
  ))}
        </div>
        </div>
        <div className="profile m-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 justify-center mb-3">
            <div className="rounded-full bg-blue-500 bg-opacity-20 w-9 h-10 flex justify-center items-center">
              <span className="text-white text-base font-bold">{last_name.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-white font-semibold">{first_name+" "+last_name}</h4>
              <p className="text-mapi-neutral-4 font-semibold -mt-0.5">{email}</p>
            </div>
          </div>
          <Link to="/providerProfileSettings" className="  border-2 border-[#343839] flex justify-center items-center text-white rounded-xl py-2 mx-3 font-bold">Settings</Link>
          <button onClick={handleLogout} className=" border-2 border-[#343839] flex justify-center items-center text-white rounded-xl py-2 mx-3 font-bold">Logout</button>
        </div>
    </div>
       
      </div>
    </div>
  );
}

export default SideBarPro;
