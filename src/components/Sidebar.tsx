import logo from "../assets/logo 1.png";
import { Link,useLocation } from 'react-router-dom';
import { PiBarcode } from "react-icons/pi";
import { BiSolidDashboard ,BiDollar } from "react-icons/bi";
import { IoBag } from "react-icons/io5";


function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
//   const userRaw = localStorage.getItem('user');
//   const user = userRaw ? JSON.parse(userRaw) : null;
 

  const items = [
    { icon:<BiSolidDashboard size={24} />,text: 'Dashboard', path: '/dashboard' },
    { icon:<IoBag size={24} /> ,text: 'My APIs', path: '/my-apis' },
    {icon:<BiDollar size={24} />, text: 'Billing & Incomes', path: '/billing-incomes' },
    {icon:<PiBarcode size={24} />, text: 'Updates & FAQ', path: '/updates-faq' },
  ];



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
      className={`flex items-center   text-md p-3 mr-5 ml-3 rounded-lg font-semibold  ${
        pathname === item.path ? 'bg-mapi-secondary-1 bg-opacity-50 text-mapi-secondary-3 shadow-link ' : 'text-mapi-neutral-4'
      }`}
      
    >
      {item.icon}
      <span className="ml-3">{item.text}</span>
    </Link>
  ))}
        </div>
        </div>
        <div className="profile m-3">
      {/* {user && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 justify-center mb-3">
            <div className="rounded-full bg-blue-500 bg-opacity-20 w-9 h-10 flex justify-center items-center">
              <span className="text-white text-base font-bold">{user.last_name.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-white font-semibold">{user.first_name+" "+user.last_name}</h4>
              <p className="text-mapi-neutral-4 font-semibold -mt-0.5">{user.email}</p>
            </div>
          </div>
          <Link to="/" className=" border-neutral-5 flex justify-center items-center text-white rounded-xl py-2 mx-3 font-bold">Settings</Link>
          <button onClick={handleLogout} className="border-neutral-5 flex justify-center items-center text-white rounded-xl py-2 mx-3 font-bold">Logout</button>
        </div>
      )} */}
    </div>
       
      </div>
    </div>
  );
}

export default Sidebar;