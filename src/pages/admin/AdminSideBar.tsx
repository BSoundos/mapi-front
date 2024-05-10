import logo from "../../assets/logo.png";
import { Link, useLocation } from 'react-router-dom';
import { BiSolidDashboard, BiUser } from "react-icons/bi";

function AdminSideBar() {
  const location = useLocation();
  const pathname = location.pathname;

  const items = [
    { icon: <BiSolidDashboard size={24} />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <BiUser size={24} />, text: 'Users', path: '/admin/users' },
    { icon: <BiUser size={24} />, text: 'Providers', path: '/admin/providers' },
  ];

  return (
    <div className="flex-1 max-w-[260px] min-w-[260px]  overflow-auto ">
      <div className="bg-mapi-neutral-2 border-solid border-r-[#343B4F] border-r h-screen overflow-hidden flex flex-col justify-between pb-3 text-sm">
        <div>
          <div className="logo flex justify-center items-center pt-4 pb-8">
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
      </div>
    </div>
  );
}

export default AdminSideBar;
