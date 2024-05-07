import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PricingTypes({id}) {
    const location = useLocation();
    const pathname = location.pathname;
    const items = [
        {text: 'Public plan', path: `/pricing-api/public/${id}` },
        {text: 'Private plan', path: `/pricing-api/private/${id}`},
      ];
  return (
    <div className="flex">
        <div className="flex  gap-2 mt-6">
            {items.map((item, index) => (
        <Link
        key={index}
        to={item.path}
        className={`text-sm p-1.5 rounded-md    ${
            pathname.includes(item.path) ? ' text-[#99BDE6] border-2 border-mapi-secondary-3 font-semibold bg-[#2C5EAF] bg-opacity-15' : 'text-mapi-text bg-mapi-neutral-1 '
        }`}
        
        >
        <span className="">{item.text}</span>
        </Link>
    ))}
            </div>
       </div>
  )
}
