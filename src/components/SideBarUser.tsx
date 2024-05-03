import logo from "../assets/logo.png";
import { Link,useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";


function SideBarUser() {
  const location = useLocation();
  const pathname = location.pathname;
 
 

  const items = [
    {text: 'Profile Settings', path: '/UserProfilSetting' },
    { text: 'Security Settings', path: '/UserSecuritySettings' },
    {text: 'Support Tickets', path: '/Support-Tickets' },
    {text: 'Transaction History', path: '/Transaction-History' },
    {text: 'Subscription & Usage', path: '/Subscription-Usage' },

  ];
 


  return (
    <div className="w-[25%] pb-40">
        <div className="bg-[#FFFFFF] bg-opacity-10 flex-1  ml-10  border border-opacity-30 border-[#7E89AC] rounded shadow-md">
            <div className="   pt-20  pb-36">
            <div className=" border-solid border-r-[#343B4F] border-r  overflow-hidden flex flex-col justify-between pb-3 text-sm">
                <div>
                

                <div className="flex flex-col justify-center ">
                {items.map((item, index) => (
            <Link
            key={index}
            to={item.path}
            className={`flex items-center   text-md p-3 mr-5 ml-3 rounded-lg font-semibold  ${
                pathname === item.path ? 'bg-mapi-secondary-1 bg-opacity-50 text-mapi-secondary-3 shadow-link ' : 'text-mapi-neutral-4'
            }`}
            
            >
            <span className="ml-3">{item.text}</span>
            </Link>
        ))}
                </div>
                </div>
            
            
            </div>
            </div>
            </div>
    </div>
  );
}

export default SideBarUser;
